"use client";

import { useMemo } from "react";
import { useAccount, useNetwork } from "wagmi";

import { truncateText } from "@/utils";
import { useNFTs } from "@/utils/api/useNfts";
import { COVALENT_CHAIN_PARAMS } from "@/utils/constants";

import Account from "./Account";
export default function Page(props) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { nfts } = useNFTs({
    address: address,
    chain_id: COVALENT_CHAIN_PARAMS[chain?.network],
  });
  const getNft = useMemo(() => {
    return nfts?.find(
      (_nft) =>
        _nft.nftData.token_id == props.params.tid &&
        String(_nft.contract_address) == props.params.ca
    );
  }, [nfts]);

  return (
    <div className="p-4 pt-20">
      {getNft && (
        <div className="grid grid-cols-auto items-center gap-x-10">
          <div className="col-span-4 flex items-start justify-end">
            <img
              className="w-[300px] rounded-xl"
              src={getNft.nftData.external_data.image}
              alt=""
            />
          </div>
          <div className="col-span-8">
            <div className="flex items-center gap-20">
              <div className="flex flex-col gap-5">
                <div className="text-sm font-bold">Contract:</div>
                <div className="text-sm font-bold">Contract Address:</div>
                <div className="text-sm font-bold">Token ID:</div>
                <div className="text-sm font-bold">Owner:</div>
                {/* <div className="text-sm font-bold">Generated Address :</div> */}
              </div>
              <div className="flex flex-col gap-5">
                <p>{getNft.contract_name}</p>
                <p>{getNft.contract_address}</p>
                <p>{truncateText(getNft.nftData.token_id)}</p>
                <p>{getNft.nftData.original_owner}</p>
              </div>
            </div>
            <Account
              tokenId={props.params.tid}
              tokenContract={props.params.ca}
            />
          </div>
        </div>
      )}
    </div>
  );
}
