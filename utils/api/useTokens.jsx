import { Client } from "@covalenthq/client-sdk";
import useSWR from "swr";

const COVALENT_API_KEY = "cqt_rQcRCCmrKgQH7kQbYBpm4WjtGKtC";

export const fetchTokens = async ({ chain_id, address }) => {
  const client = new Client(COVALENT_API_KEY);
  const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
    chain_id,
    address,
    {}
  );
  console.log(resp.data);
  return resp.data;
};

const useTokens = ({ chain_id, address }) => {
  const canFetch = address;
  const { data: tokens, isValidating: tokensLoader } = useSWR(
    canFetch ? { type: "tokens", chain_id: chain_id, address } : null,
    fetchTokens,
    {
      revalidateIfStale: true,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return { tokens, tokensLoader };
};

export { useTokens };
