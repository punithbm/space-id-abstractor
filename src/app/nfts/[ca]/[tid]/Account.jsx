"use client";
import { TokenboundClient } from "@tokenbound/sdk";
import { useCallback, useEffect, useState } from "react";
import { createWalletClient, custom, http, parseUnits } from "viem";
import { useAccount, useNetwork } from "wagmi";

import { useTokens } from "@/utils/api/useTokens";
import { useWagmi } from "@/utils/wagmi/WagmiContext";

import { wagmiClient as client } from "../../../../../utils/wagmi/index";
import Button from "./Button";
import { getExplorerUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { icons } from "@/utils/images";

const ethAmount = 0.001;
const ethAmountWei = parseUnits(`${ethAmount}`, 18);

function Account(props) {
  const { tokenId, tokenContract, chain_id } = props;
  const { address } = useAccount();
  const [isAccountDeployed, setIsAccountDeployed] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState("");
  const { sendTransaction } = useWagmi();
  const { chain } = useNetwork();
  const walletClient = createWalletClient({
    chain: chain,
    account: address,
    transport: window.ethereum ? custom(window.ethereum) : http(),
  });
  const { tokens } = useTokens({
    address: generatedAddress,
    chain_id: chain_id,
  });
  const tokenboundClient = new TokenboundClient({
    walletClient,
    chainId: chain.id,
  });
  const checkIfAccountIsDeployed = async (address) => {
    const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
      accountAddress: address,
    });
    setIsAccountDeployed(isAccountDeployed);
  };
  useEffect(() => {
    async function testTokenboundClass() {
      if (!tokenboundClient) return;

      const tokenboundAccount = tokenboundClient.getAccount({
        tokenContract,
        tokenId,
      });
      setGeneratedAddress(tokenboundAccount);

      await checkIfAccountIsDeployed(tokenboundAccount);
      const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
        account: tokenboundAccount,
        to: "0xdBd71c0b92caA92e37b2bCC43019f38947A2B0e6",
        value: 0n,
        data: "",
      });

      const preparedCreateAccount = await tokenboundClient.prepareCreateAccount(
        {
          tokenContract,
          tokenId,
        }
      );

      // if (address) {
      //   walletClient?.sendTransaction(preparedCreateAccount)
      //   walletClient?.sendTransaction(preparedExecuteCall)
      // }
    }

    testTokenboundClass();
  }, []);

  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const createdAccount = await tokenboundClient.createAccount({
      tokenContract,
      tokenId,
    });
    setGeneratedAddress(createdAccount);
    alert(`new account: ${createdAccount}`);
  }, [tokenboundClient]);

  const executeCall = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const executedCall = await tokenboundClient.executeCall({
      account: generatedAddress,
      to: address,
      value: ethAmountWei,
      data: "0x",
    });
    executedCall && alert(`Sent ${ethAmount} ETH to ${address}`);
  }, [tokenboundClient]);

  const sendETHTokenToAAWallet = async () => {
    const transaction = await sendTransaction({
      client,
      to: generatedAddress,
      value: ethAmountWei,
    });

    return transaction;
  };
  return (
    <div>
      <div
        className={`mt-5 flex items-center gap-20 rounded p-2 ${
          isAccountDeployed ? "bg-[#48BB78]" : "bg-[#ffbd06]"
        } `}
      >
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">Token Bound Account :</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="ml-[-44px] text-base font-normal text-white">
            {generatedAddress}
          </p>
          <Link
            href={getExplorerUrl(
              "address",
              chain?.blockExplorers?.default?.url || "",
              generatedAddress,
              address
            )}
            target="_blank"
            passHref
          >
            <Image
              className="w-5 h-5"
              src={icons.redirectWhite}
              alt="redirect"
            />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-20">
        <div className="flex flex-col gap-3">
          <p className="text-base font-normal text-[#CBD5E1]">Status:</p>
        </div>
        <div className="flex flex-col gap-3">
          {!isAccountDeployed ? (
            <>
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold text-[#ffbd06] ml-[90px]">
                  Not Deployed{" "}
                </p>
                <Button onClick={() => createAccount()}>Deploy</Button>
              </div>
            </>
          ) : (
            <p className="text-base font-semibold text-[#48BB78] ml-[90px]">
              {" "}
              Deployed{" "}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        {isAccountDeployed && (
          <>
            <div className="flex items-center gap-4">
              <Button onClick={() => sendETHTokenToAAWallet()}>
                Receive {ethAmount} ETH
              </Button>

              <Button onClick={() => executeCall()}>Send</Button>
            </div>
            <div className="my-2 py-10">
              <h1>Tokens available in the Token Bound Account:</h1>
              <div className="flex flex-wrap gap-1">
                {tokens?.items?.length > 0 &&
                  tokens?.items.map((token) => {
                    return (
                      <>
                        <div className=" w-fit p-5 bg-black/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img width={50} src={token.logo_url}></img>
                            <div className="text-base font-normal text-white">
                              <p className="text-base font-semibold">
                                {token.contract_name}
                              </p>
                              <h4>{token.pretty_quote}</h4>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
