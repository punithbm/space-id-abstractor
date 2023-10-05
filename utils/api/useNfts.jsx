import { Client } from "@covalenthq/client-sdk";
import useSWR from "swr";

const fetchNFTs = async ({ address }) => {
  const client = new Client("cqt_rQcRCCmrKgQH7kQbYBpm4WjtGKtC");
  const resp = await client.NftService.getNftsForAddress(
    "eth-goerli",
    address || "",
    { withUncached: true }
  );
  const nfts = [];

  resp.data.items.forEach((_nftGroup) => {
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

const useNFTs = ({ address }) => {
  const canFetch = address;
  const { data: nfts, isValidating: nftsLoader } = useSWR(
    canFetch ? { type: "nfts", address } : null,
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
