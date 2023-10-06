import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { switchNetwork } from '@wagmi/core';
import { ReactElement } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, bsc ,goerli} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { productName, rainbowKitProjectId } from "../../constants";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum, bsc,goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: productName,
  projectId: rainbowKitProjectId,
  chains,
});

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient,
});

export const WagmiHoc = ({ children }: { children: ReactElement }) => {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

// export const switchToNFTNetwork = async (chain_id: number) => {
//   await switchNetwork({
//     chainId: chain_id,
//   });
// };
