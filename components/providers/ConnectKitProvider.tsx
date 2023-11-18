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
      <NextConnectKitProvider
        customTheme={{
          '--ck-body-background': '#ffffff',
          '--ck-body-color': '#000000',
          '--ck-body-color-muted': '#151111',
          '--ck-primary-button-background': '#4ade80',
          '--ck-secondary-button-background': '#4ade80',
          '--ck-primary-button-hover-background': '#22c55e',
          '--ck-secondary-button-hover-background': '#22c55e',
          '--ck-tooltip-background': '#ffffff',
        }}
      >
        {children}
      </NextConnectKitProvider>
    </WagmiConfig>
  );
};

export default ConnectKitProvider;
