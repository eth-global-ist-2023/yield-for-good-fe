import {
  baseGoerli,
  celoAlfajores,
  goerli,
  lineaTestnet,
  polygonZkEvmTestnet,
  scrollSepolia,
} from 'wagmi/chains';

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

export const CHAIN_LOGO = {
  [goerli.id]:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
  [baseGoerli.id]:
    'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.webp',
  [polygonZkEvmTestnet.id]:
    'https://zkevm.polygonscan.com/images/svg/brands/main.svg?v=23.11.2.1',
  [scrollSepolia.id]: 'https://paganresearch.io/images/scrollblock.jpg',
  [lineaTestnet.id]:
    'https://assets-global.website-files.com/636e894daa9e99940a604aef/64251169a127ac166fed9111_Bridge%20to%20Linea%20(1).webp',
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
  SCROLL: {
    id: 'scroll',
    logoUrl: 'https://paganresearch.io/images/scrollblock.jpg',
  },
  LINEA: {
    id: 'linea',
    logoUrl:
      'https://assets-global.website-files.com/636e894daa9e99940a604aef/64251169a127ac166fed9111_Bridge%20to%20Linea%20(1).webp',
  },
  CELO: {
    id: 'celo',
    logoUrl: 'https://cryptologos.cc/logos/celo-celo-logo.png',
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
  '0x99cb9b1514420e368f81ca3a4feba7224fc5d3f4': getDaiConfig(
    CHAINS.SCROLL.id,
    CHAINS.SCROLL.logoUrl
  ),
  '0x063b71654ac54fc8dfd60577b1015b2972c40d07': getApeConfig(
    CHAINS.SCROLL.id,
    CHAINS.SCROLL.logoUrl
  ),
  '0x1653F95b38e70D8ef79494e7Cc6F3937BDEE8A5': getUsdcConfig(
    CHAINS.SCROLL.id,
    CHAINS.SCROLL.logoUrl
  ),
  '0x09035ecfed30a7bbbc5edc2ba31009b781f48fce': getDaiConfig(
    CHAINS.LINEA.id,
    CHAINS.LINEA.logoUrl
  ),
  '0x9b428e21b8a41e4bf666bc75f5830c3512f91ec1': getApeConfig(
    CHAINS.LINEA.id,
    CHAINS.LINEA.logoUrl
  ),
  '0x59512dbb3d5d2e1d69bd9f869a143623e90fd731': getUsdcConfig(
    CHAINS.LINEA.id,
    CHAINS.LINEA.logoUrl
  ),
  '0x5adf5302d6a49db6969f6ae8a9984acf68782be8': getDaiConfig(
    CHAINS.CELO.id,
    CHAINS.CELO.logoUrl
  ),
  '0x8718266f35d05a36b9da0a80fde6c7f15e0a241d': getApeConfig(
    CHAINS.CELO.id,
    CHAINS.CELO.logoUrl
  ),
  '0xdb25c34ee0ed0922589b8ed4ec4c8faabe24d2e0': getUsdcConfig(
    CHAINS.CELO.id,
    CHAINS.CELO.logoUrl
  ),
};

export const ASSET_POOLS = {
  DAI: 'SparkLend',
  M20: 'APE Coin',
  USDC: 'YEARN',
};

export const VAULT_REGISTRY = {
  [goerli.id]: process.env.NEXT_PUBLIC_VAULT_GOERLI_ADDRESS as string,
  [baseGoerli.id]: process.env.NEXT_PUBLIC_VAULT_BASE_ADDRESS as string,
  [polygonZkEvmTestnet.id]: process.env
    .NEXT_PUBLIC_VAULT_POLYGON_ZKEVM_ADDRESS as string,
  [scrollSepolia.id]: process.env.NEXT_PUBLIC_VAULT_SCROLL_ADDRESS as string,
  [lineaTestnet.id]: process.env.NEXT_PUBLIC_VAULT_LINEA_ADDRESS as string,
  [celoAlfajores.id]: process.env.NEXT_PUBLIC_VAULT_CELO_ADDRESS as string,
};
