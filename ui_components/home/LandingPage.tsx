"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import Button from "@/ui_components/Button";
import { getExplorerUrl, trimAddress } from "@/utils";
import { useNFTs } from "@/utils/api/useNfts";
import { COVALENT_CHAIN_PARAMS } from "@/utils/constants";
import { icons } from "@/utils/images";
function LandingPage() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const getEnsName = async () => {
    try {
      const response = await fetch(
        `https://cors.codecrane.com/https://api.prd.space.id/v1/getName?tld=arb1&address=${address}`
      );
      const data = await response.json();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getEnsName();
  }, []);

  const { nfts } = useNFTs({
    address: address,
    chain_id: COVALENT_CHAIN_PARAMS[chain?.network],
  });

  console.log(chain, "chain");

  function filterNFTs(nfts: any) {
    console.log(nfts, "nfts");
    return nfts?.filter(
      (nft: any) =>
        nft?.contract_name?.includes("SPACE ID") ||
        nft?.contract_name?.toLowerCase().includes("name")
    );
  }

  return (
    <>
      {!isConnected && (
        <section className="pt-10">
          <div className="container mx-auto">
            <h1 className="mb-4 text-center text-[32px]">
              {" "}
              Powering Token bound accounts with Space IDs
            </h1>
            <p className="mb-10 text-center">
              Start by using your token bound account with space ID now!!
            </p>
            <img src={icons.banner.src} className="mx-auto" alt="" />
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 xl:gap-x-8">
          {filterNFTs && filterNFTs.length > 0 ? filterNFTs(nfts)?.map((_nft: any) => (
            <div className="group bg-black/40 p-8" key={_nft.contract_address}>
              <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                {_nft?.nftData?.external_data?.image && (
                  <img
                    src={_nft.nftData.external_data.image}
                    className="aspect-square h-full w-full object-cover object-center group-hover:opacity-75"
                    alt="nft"
                  />
                )}
              </div>

              <div className="px-2 py-3">
                <p className="mt-1 text-lg font-medium text-gray-200">
                  {" "}
                  Contract: {_nft.contract_name}
                </p>
                <div className="mt-1 text-lg font-medium text-gray-200">
                  {" "}
                  Contract Address: {" "}
                  <a
                    href={getExplorerUrl(
                      "address",
                      chain?.blockExplorers?.default?.url || "",
                      _nft.contract_address
                    )}
                  >
                    <span>{trimAddress(_nft.contract_address, 5)}</span>
                  </a>
                </div>
                <p className="mt-1 text-lg font-medium text-gray-200">
                  {" "}
                  Token ID: {trimAddress(String(_nft.nftData.token_id), 5)}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-200">
                  {" "}
                  Owner: {trimAddress(_nft.nftData.original_owner, 5)}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-200">
                  {" "}
                  Original Owner: {trimAddress(_nft.nftData.original_owner, 5)}
                </p>
              </div>
              <div className="p-2">
                <Link
                  href={`nfts/${_nft.contract_address}/${String(
                    _nft?.nftData?.token_id || ""
                  )}`}
                >
                  <Button className="mx-auto w-full rounded bg-[#00cbc6] px-3.5 py-2 text-sm font-semibold text-[#1e1f2d] shadow-sm hover:bg-[#00a5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {" "}
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          ))
        :
         <div className="">
                <Link
                  href=""
                >
                  <Button className="mx-auto w-full rounded bg-[#00cbc6] px-3.5 py-2 text-sm font-semibold text-[#1e1f2d] shadow-sm hover:bg-[#00a5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {" "}
                    Login
                  </Button>
                </Link>
              </div>}
        </div>
      </section>
    </>
  );
}

export default LandingPage;
