"use client";

import { switchNetwork } from "@wagmi/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import Button from "@/ui_components/Button";
import { getExplorerUrl, trimAddress } from "@/utils";
import { useAllNFTs } from "@/utils/api/useNfts";
import { COVALENT_CHAIN_PARAMS } from "@/utils/constants";
import { icons } from "@/utils/images";

import { CopyIcon } from "../shared";

function LandingPage() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  const chainsSupported = Object.values(COVALENT_CHAIN_PARAMS).map(
    (value) => value
  );

  const { nfts, nftsLoader } = useAllNFTs({
    address: address,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    chain_ids: chainsSupported,
  });

  function filterNFTs(nfts: any) {
    return nfts?.filter(
      (nft: any) =>
        nft?.contract_name?.includes("SPACE ID") ||
        nft?.contract_name?.toLowerCase().includes("name")
    );
  }

  async function navigateToNFTAccount(_nft: any) {
    try {
      if (!_nft?.nftData?.chain_id) throw new Error("CHAIN ID NOT PRESENT");
      switchNetwork({
        chainId: _nft?.nftData?.chain_id,
      });
    } catch (error) {
      console.log("Error", error);
    }
    // giving time for the chain to switch
    setTimeout(() => {
      const token_id = String(_nft?.nftData?.token_id || "");
      router.push(`nfts/${_nft.contract_address}/${token_id}`);
    }, 1000);
  }

  const handleRoute = (chain: string, address: string) => {
    const route = getExplorerUrl("address", chain, address);
    window.open(route, "_ blank");
  };
  return (
    <>
      {!isConnected ? (
        <section className="pt-10">
          <div className="container mx-auto">
            <h1 className="mb-4 text-center font-semibold text-[32px]">
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
        <section className="py-5">
          <div
            role="status"
            className="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
          >
            <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-[#CBD5E1] dark:text-gray-600"
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
        <section className="py-5">
          {nfts && nfts.length && filterNFTs(nfts).length ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 xl:gap-x-8">
              {filterNFTs(nfts)?.map((_nft: any) => (
                <div
                  onClick={() => navigateToNFTAccount(_nft)}
                  className="group rounded-xl p-4 transition-all duration-300 ease-in-out hover:bg-[#000420]"
                  key={_nft.contract_address}
                >
                  <div className="w-full overflow-hidden rounded-l">
                  <Image
                        src={_nft?.nftData?.external_data?.image?.includes("http") ?  _nft?.nftData?.external_data?.image : icons.imagePlaceholder}
                        className="rounded-xl aspect-square h-full w-full object-cover object-center transition-all duration-300 ease-out group-hover:scale-[1.05]"
                        alt="nft"
                        width={300}
                        height={300}
                      />
                  </div>

                  <div className="px-2 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col gap-2">
                        <p className="text-base font-semibold text-[#CBD5E1]">
                          Contract:
                        </p>
                        <p className="text-base font-semibold text-[#CBD5E1]">
                          Contract Address:
                        </p>
                        <p className="text-base font-semibold text-[#CBD5E1]">
                          Token ID:
                        </p>
                        <p className="text-base font-semibold text-[#CBD5E1]">
                          Owner:
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-right">
                        <p className="text-base font-normal text-white">
                          {_nft.contract_name}
                        </p>
                        <div className="text-base font-normal text-white">
                          <span className="flex items-center justify-end gap-2">
                            {trimAddress(_nft.contract_address, 5)}
                            <CopyIcon
                              className="w-4 h-4"
                              icon={icons.copyGrey}
                              text={_nft.contract_address}
                            />
                            <div
                              onClick={(e) => {
                                handleRoute(
                                  chain?.blockExplorers?.default?.url || "",
                                  _nft.contract_address
                                );
                                e.preventDefault();
                                e.stopPropagation;
                              }}
                              className="h-4 w-4"
                            >
                              <Image src={icons.redirectGrey} alt="redirect" />
                            </div>
                          </span>
                        </div>
                        <div className="text-base font-normal text-white flex items-center justify-end gap-2">
                          {trimAddress(String(_nft.nftData.token_id), 5)}
                          <CopyIcon
                            className="w-4 h-4"
                            icon={icons.copyGrey}
                            text={_nft.nftData.token_id}
                          />
                        </div>
                        <div className="text-base font-normal text-white flex items-center justify-end gap-2">
                          {trimAddress(_nft.nftData.original_owner, 5)}
                          <CopyIcon
                            className="w-4 h-4"
                            icon={icons.copyGrey}
                            text={_nft.nftData.original_owner}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button className="mx-auto w-full rounded bg-[#00cbc6] px-3.5 py-2 text-sm font-semibold text-[#1e1f2d] shadow-sm hover:bg-[#00a5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      {" "}
                      Login
                    </Button>
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
