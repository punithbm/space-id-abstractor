import useSWR from "swr";
import { SUPPORTED_CHAIN_IDS } from "../constants";

const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";
const COVALENT_API_KEY = "cqt_rQcRCCmrKgQH7kQbYBpm4WjtGKtC";

export const fetchNFTs = async ({ chain_id, address }) => {
  const queryParams = new URLSearchParams({
    key: COVALENT_API_KEY,
    "with-uncached": "true",
    "no-logs": "true",
  });
  const nfts = [];

  if (!chain_id) return;
  const covalentNFTsResponse = await fetch(
    `${COVALENT_BASE_URL}/${chain_id}/address/${address}/balances_nft/?${queryParams}`,
    {
      method: "GET",
    }
  );
  const { data } = await covalentNFTsResponse.json();
  data.items.forEach((_nftGroup) => {
    _nftGroup.nft_data.forEach((_nft) => {
      const _newData = {
        ..._nftGroup,
        nftData: { ..._nft, chain_id: SUPPORTED_CHAIN_IDS[chain_id] },
      };
      _newData.nft_data = [];

      nfts.push(_newData);
    });
  });

  return nfts;
};

const useNFTs = ({ chain_id, address }) => {
  const canFetch = address;
  const { data: nfts, isValidating: nftsLoader } = useSWR(
    canFetch ? { type: "nfts", chain_ids: chain_id, address } : null,
    fetchNFTs,
    {
      revalidateIfStale: true,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return { nfts, nftsLoader };
};

export const fetchAllNFTs = async ({ chain_ids, address }) => {
  const nfts = chain_ids.map((chain_id) => {
    return fetchNFTs({ chain_id, address });
  });
  const allNFTS = await Promise.all(nfts);
  console.log(allNFTS);
  return [].concat.apply([], allNFTS);
};

const useAllNFTs = ({ chain_ids, address }) => {
  const canFetch = address && chain_ids?.length > 0;
  const { data: nfts, isValidating: nftsLoader } = useSWR(
    canFetch ? { type: "allNfts", chain_ids, address } : null,
    fetchAllNFTs,
    {
      revalidateIfStale: false,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return { nfts, nftsLoader };
};

export { useAllNFTs, useNFTs };
