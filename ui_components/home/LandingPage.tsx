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

  const { nfts, nftsLoader } = useNFTs({
    address: address,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    chain_id: COVALENT_CHAIN_PARAMS[chain?.network],
  });

  function filterNFTs(nfts: any) {
    return nfts?.filter(
      (nft: any) =>
        nft?.contract_name?.includes("SPACE ID") ||
        nft?.contract_name?.toLowerCase().includes("name")
    );
  }

  console.log("isConnected", isConnected);

  return (
    <>
      {!isConnected ? (
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
      ) : nftsLoader ? (
        <section className="mt-10">
          <div
            role="status"
            className="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
          >
            <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </section>
      ) : (
        <section className="mt-10">
          {nfts && nfts.length && filterNFTs(nfts).length ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 xl:gap-x-8">
              {filterNFTs(nfts)?.map((_nft: any) => (
                <div
                  className="group bg-black/40 p-8"
                  key={_nft.contract_address}
                >
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
                      Contract Address:{" "}
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
                      Original Owner:{" "}
                      {trimAddress(_nft.nftData.original_owner, 5)}
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
              ))}
            </div>
          ) : (
            <>
              <div className="mt-60 text-center">
                <h6 className="mb-4 text-[28px]">
                  No Space IDs found for this account
                </h6>
                <a
                  href="https://space.id/"
                  className="mx-auto rounded bg-[#00cbc6] px-3.5 py-2 text-sm font-semibold text-[#1e1f2d] shadow-sm hover:bg-[#00a5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  Register Space ID
                </a>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default LandingPage;
