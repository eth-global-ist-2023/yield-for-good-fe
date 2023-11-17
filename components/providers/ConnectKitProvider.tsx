'use client';

import {
  ConnectKitProvider as NextConnectKitProvider,
  getDefaultConfig,
} from 'connectkit';
import { ReactNode } from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import {
  baseGoerli,
  celoAlfajores,
  goerli,
  lineaTestnet,
  mantleTestnet,
  neonDevnet,
  polygonZkEvmTestnet,
  scrollSepolia,
} from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    chains: [
      goerli,
      neonDevnet,
      baseGoerli,
      celoAlfajores,
      mantleTestnet,
      polygonZkEvmTestnet,
      scrollSepolia,
      lineaTestnet,
    ],
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,

    appName: 'YieldForGood',
  })
);

const ConnectKitProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <NextConnectKitProvider>{children}</NextConnectKitProvider>
    </WagmiConfig>
  );
};

export default ConnectKitProvider;
