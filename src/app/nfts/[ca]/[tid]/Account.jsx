"use client";
import { TokenboundClient } from "@tokenbound/sdk";
import { useCallback, useEffect, useState } from "react";
import { createWalletClient, custom, http, parseUnits } from "viem";
import { useAccount, useNetwork } from "wagmi";

import { useWagmi } from "@/utils/wagmi/WagmiContext";

import { wagmiClient as client } from "../../../../../utils/wagmi/index";
import Button from "./Button";

const ethAmount = 0.001;
const ethAmountWei = parseUnits(`${ethAmount}`, 18);

function Account(props) {
  const { tokenId, tokenContract } = props;
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
        className={`mt-5 flex items-center gap-20 rounded ${
          isAccountDeployed ? "bg-[#48BB78]" : "bg-[#ffbd06] "
        } p-2`}
      >
        <div className="flex flex-col gap-3">
          <div className="text-sm font-bold">Token Bound Account :</div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="ml-[-32px]">{generatedAddress}</p>
        </div>
      </div>
      {/* <p>Generated Address : {generatedAddress}</p> */}
      <br />
      {!isAccountDeployed ? (
        <>
          <p className="mb-2">Status Not Deployed </p>
          <Button onClick={() => createAccount()}>Deploy</Button>
        </>
      ) : (
        <p>Status Deployed </p>
      )}

      <br />
      <br />

      {isAccountDeployed && (
        <>
          <Button onClick={() => sendETHTokenToAAWallet()}>
            Receive {ethAmount} ETH
          </Button>
          <br />
          <br />
          <Button onClick={() => executeCall()}>Send</Button>
        </>
      )}
      {/* <iframe
        title="app"
        src={"https://app.uniswap.org/swap"}
        ref={iframeRef}
        className="h-[400px] w-[400px]"
      /> */}
    </div>
  );
}

export default Account;
