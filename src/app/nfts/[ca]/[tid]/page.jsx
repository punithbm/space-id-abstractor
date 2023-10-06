"use client";

import { useMemo, useState,useEffect,useCallback } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/navigation";

import { truncateText } from "@/utils";
import { useAllNFTs, useNFTs } from "@/utils/api/useNfts";
import { COVALENT_CHAIN_PARAMS } from "@/utils/constants";
import SiteConnector from "./(siteconnector)/SiteConnector";
import { icons } from "@/utils/images";
import { TokenboundClient } from "@tokenbound/sdk";
import { createWalletClient, custom, http, parseUnits } from "viem";
import { useWagmi } from "@/utils/wagmi/WagmiContext";
import { wagmiClient as client } from "../../../../../utils/wagmi/index";
import Button from "./Button";
import { getExplorerUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { useTokens } from "@/utils/api/useTokens";

const ethAmount = 0.001;
const ethAmountWei = parseUnits(`${ethAmount}`, 18);

export default function Page(props) {
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const chainsSupported = Object.values(COVALENT_CHAIN_PARAMS);
  const { nfts } = useAllNFTs({
    address: address,
    chain_ids: chainsSupported,
  });
  const getNft = useMemo(() => {
    return nfts?.find(
      (_nft) =>
        _nft.nftData.token_id == props.params.tid &&
        String(_nft.contract_address) == props.params.ca
    );
  }, [nfts]);

  const handleBackNavigation = () => {
    router.back();
  };

  const [ tokenId, tokenContract ] = [props.params.tid,props.params.ca];
  const [isAccountDeployed, setIsAccountDeployed] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState("");
  const { sendTransaction } = useWagmi();

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
  const chain_id = COVALENT_CHAIN_PARAMS[chain?.network];
  const { tokens } = useTokens({
    address: generatedAddress,
    chain_id: chain_id,
  });



  return (
    <div className="p-4 pt-10">
      <Image
        onClick={handleBackNavigation}
        src={icons.backGrey}
        alt="back"
        className="cursor-pointer mb-4"
      />
      {getNft && (
        <div className="grid grid-cols-auto gap-x-10">
          <div className="col-span-4 flex items-start justify-end relative">
            <Image
              className="w-[300px] rounded-xl"
              src={getNft?.nftData?.external_data?.image || icons.imagePlaceholder}
              alt=""
              width={300}
              height={300}
            />

          </div>
          <div className="col-span-8">
            <div className="flex items-center gap-20">
              <div className="flex flex-col gap-5">
                <p className="text-base font-semibold text-[#CBD5E1]">
                  Contract:
                </p>
                <p className="text-base font-semibold text-[#CBD5E1]">
                  Contract Address:
                </p>
                <p className="text-base font-semibold text-[#CBD5E1]">
                  Token ID:
                </p>
                <p className="text-base font-semibold text-[#CBD5E1]">Owner:</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-base font-normal text-white">
                  {getNft.contract_name}
                </p>
                <p className="text-base font-normal text-white">
                  {getNft.contract_address}
                </p>
                <p className="text-base font-normal text-white">
                  {truncateText(getNft.nftData.token_id)}
                </p>
                <p className="text-base font-normal text-white">
                  {getNft.nftData.original_owner}
                </p>
              </div>
            </div>
           <>
           <div>
      <div
        className={`mt-5 flex items-center gap-20 rounded p-2 ${isAccountDeployed ? "bg-[#48BB78]" : "bg-[#ffbd06]"} `}
      >
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">Space ID Bound Account :</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="ml-[-44px] text-base font-normal text-white">{generatedAddress}</p>
          <Link href={getExplorerUrl("address", chain?.blockExplorers?.default?.url || "", generatedAddress, address)} target="_blank" passHref>
            <Image className="w-5 h-5" src={icons.redirectWhite} alt="redirect" />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-20">
        <div className="flex flex-col gap-3">
          <p className="text-base font-normal text-[#CBD5E1]">
            Status:
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {!isAccountDeployed ? (
            <>
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold text-[#ffbd06] ml-[90px]">Not Deployed </p>
                <Button onClick={() => createAccount()}>Deploy</Button>
              </div>
            </>
          ) : (
            <p className="text-base font-semibold text-[#48BB78] ml-[90px]"> Deployed </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        {isAccountDeployed && (
          <div className="flex items-center gap-4">
            <Button onClick={() => executeCall()}>Send ETH to SpaceID Bound Account</Button>
            <Button onClick={() => sendETHTokenToAAWallet()}>
              Receive {ethAmount} ETH from SpaceID Bound Account
            </Button>
          </div>
        )}

      <div className="my-2 py-5">
              <h1 className="mb-2">Tokens available in the Token Bound Account:</h1>
              <div className="flex flex-wrap gap-1">
                {tokens?.items?.length > 0 &&
                  tokens?.items.map((token) => {
                    return (
                      <>
                        <div className=" w-fit p-5 bg-black/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img className="rounded-full" width={50} src={token.logo_url}></img>
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
      </div>
    </div>
           </>
          </div>
        </div>
      )}

      <div>
        <SiteConnector tokenboundAccount={generatedAddress}/>
      </div>
    </div>
  );
}
