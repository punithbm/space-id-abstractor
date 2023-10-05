// import { Client } from '@covalenthq/client-sdk';
import useSWR from "swr";
const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";
const COVALENT_API_KEY = "cqt_rQcRCCmrKgQH7kQbYBpm4WjtGKtC";

export const fetchNFTs = async ({ chain_id, address }) => {
  const queryParams = new URLSearchParams({
    key: COVALENT_API_KEY,
    "with-uncached": "true",
    "no-logs": "true",
  });

  const covalentNFTsResponse = await fetch(
    `${COVALENT_BASE_URL}/${chain_id}/address/${address}/balances_nft/?${queryParams}`,
    {
      method: "GET",
    }
  );
  const { data } = await covalentNFTsResponse.json();
  const nfts = [];
  data.items.forEach((_nftGroup) => {
    _nftGroup.nft_data.forEach((_nft) => {
      const _newData = {
        ..._nftGroup,
        nftData: _nft,
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
    canFetch ? { type: "nfts", chain_id, address } : null,
    fetchNFTs,
    {
      revalidateIfStale: true,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return { nfts, nftsLoader };
};

export { useNFTs };
