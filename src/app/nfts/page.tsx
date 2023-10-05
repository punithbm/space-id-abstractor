"use client";
import { useAccount } from "wagmi";

import { useNFTs } from "@/utils/api/useNfts";

export default function Page() {
  const { address } = useAccount();

  const { nfts } = useNFTs({
    address: "0xdBd71c0b92caA92e37b2bCC43019f38947A2B0e6",
  });

  return (
    <div className="p-4">
      <div className="flex">
        {nfts?.map((_nft) => (
          <div className="rounded shadow-lg" key={_nft.contract_address}>
            {_nft?.nftData?.external_data?.image && (
              <img
                width={300}
                height={300}
                src={_nft.nftData.external_data.image}
                alt="Sunset in the mountains"
              />
            )}

            <div className="px-6 py-4">
              <div className="mb-2 text-sm font-bold">
                Contract : {_nft.contract_name as unknown as string}
              </div>
              <div className="mb-2 text-sm font-bold">
                Contract Address: {_nft.contract_address as unknown as string}
              </div>
              <div className="mb-2 text-sm font-bold">
                Token ID : {String(_nft.nftData.token_id) as unknown as string}
              </div>
              <div className="mb-2 text-sm font-bold">
                Owner : {_nft.nftData.original_owner}
              </div>
              <div className="mb-2 text-sm font-bold">
                Original owner : {_nft.nftData.original_owner}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
