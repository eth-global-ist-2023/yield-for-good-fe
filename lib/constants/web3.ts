import { baseGoerli, goerli, polygonZkEvmTestnet } from 'wagmi/chains';

const getDaiConfig = (chain: string, chainIconUrl: string) => {
  return {
    address: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
    symbol: 'DAI',
    assetIconUrl:
      'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    decimals: 18,
    chain,
    chainIconUrl,
  };
};

const getApeConfig = (chain: string, chainIconUrl: string) => {
  return {
    address: '0x328507DC29C95c170B56a1b3A758eB7a9E73455c',
    symbol: 'M20',
    assetIconUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    decimals: 18,
    chain,
    chainIconUrl,
  };
};

const getUsdcConfig = (chain: string, chainIconUrl: string) => {
  return {
    address: '0x328507DC29C95c170B56a1b3A758eB7a9E73455c',
    symbol: 'USDC',
    assetIconUrl:
      'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png',
    decimals: 18,
    chain,
    chainIconUrl,
  };
};

const CHAINS = {
  ETHEREUM: {
    id: 'ethereum',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
  },
  BASE: {
    id: 'base',
    logoUrl:
      'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.webp',
  },
  POLYGON_ZKEVM: {
    id: 'polygonZkEvm',
    logoUrl:
      'https://zkevm.polygonscan.com/images/svg/brands/main.svg?v=23.11.2.1',
  },
};

export const ASSETS_MAPPING = {
  '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844': getDaiConfig(
    CHAINS.ETHEREUM.id,
    CHAINS.ETHEREUM.logoUrl
  ),
  '0x328507dc29c95c170b56a1b3a758eb7a9e73455c': getApeConfig(
    CHAINS.ETHEREUM.id,
    CHAINS.ETHEREUM.logoUrl
  ),
  '0x2fdb64d4f6ee3b159dc85af26fdd715ddb040252': getUsdcConfig(
    CHAINS.ETHEREUM.id,
    CHAINS.ETHEREUM.logoUrl
  ),
  '0xbf1300621aa2512f44ae9ee5368ad1138551e21f': getDaiConfig(
    CHAINS.BASE.id,
    CHAINS.BASE.logoUrl
  ),
  '0x514174bca238fc6b5bbf6cfc2bd39a88f248320a': getApeConfig(
    CHAINS.BASE.id,
    CHAINS.BASE.logoUrl
  ),
  '0x1c32ec6f7d78be47a48e8f2e4846fbebe5c9392c': getUsdcConfig(
    CHAINS.BASE.id,
    CHAINS.BASE.logoUrl
  ),
  '0xfcc50b161a9d6fe667169f1f95677204e1cbaa79': getDaiConfig(
    CHAINS.POLYGON_ZKEVM.id,
    CHAINS.POLYGON_ZKEVM.logoUrl
  ),
  '0xe7d7dee5fcf3a6104aa4da2a79e83f38309ede38': getApeConfig(
    CHAINS.POLYGON_ZKEVM.id,
    CHAINS.POLYGON_ZKEVM.logoUrl
  ),
  '0x1907dbe9f2b42d6fdaf84ed9f6394e7ab0ec3258': getUsdcConfig(
    CHAINS.POLYGON_ZKEVM.id,
    CHAINS.POLYGON_ZKEVM.logoUrl
  ),
};

export const VAULT_REGISTRY = {
  [goerli.id]: process.env.NEXT_PUBLIC_VAULT_GOERLI_ADDRESS as string,
  [baseGoerli.id]: process.env.NEXT_PUBLIC_VAULT_BASE_ADDRESS as string,
  [polygonZkEvmTestnet.id]: process.env
    .NEXT_PUBLIC_VAULT_POLYGON_ZKEVM_ADDRESS as string,
};
