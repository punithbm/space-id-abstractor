"use client";

import { useMemo } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/navigation";

import { truncateText } from "@/utils";
import { useAllNFTs, useNFTs } from "@/utils/api/useNfts";
import { COVALENT_CHAIN_PARAMS } from "@/utils/constants";

import Account from "./Account";
import { icons } from "@/utils/images";
import Image from "next/image";

export default function Page(props) {
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  console.log({ chain }, "chain from NFT detail page");

  const chainsSupported = Object.values(COVALENT_CHAIN_PARAMS);
  console.log({ address, chainsSupported });
  const { nfts } = useAllNFTs({
    address: address,
    chain_ids: chainsSupported,
  });

  console.log({ nfts });
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
            <img
              className="w-[300px] rounded-xl"
              src={getNft.nftData.external_data.image}
              alt=""
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
            <Account
              tokenId={props.params.tid}
              tokenContract={props.params.ca}
              chain_id={COVALENT_CHAIN_PARAMS[chain?.network]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
