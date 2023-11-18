import { NFT_ABI } from '@/abis/nft-abi';
import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useAccount, useContractReads, useNetwork } from 'wagmi';
import { useGetNftAddress } from './useGetNftAddress';

interface IMetadata {
  name: string;
  description: string;
  image: string;
}

export const useGetTokenUris = (tokenIds: Array<string>) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { yfgSoulbound } = useGetNftAddress();

  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const calldata = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calldata.push({
      address: yfgSoulbound,
      abi: NFT_ABI,
      functionName: 'tokenURI',
      args: [tokenIds[i]],
    });
  }

  const { data } = useContractReads({
    contracts: calldata as any,
    enabled: Boolean(tokenIds),
  });

  const nfts = data?.map((d) => {
    const decoded = JSON.parse(
      Buffer.from(d.result?.split(',')[1], 'base64').toString('utf-8')
    );
    return decoded;
  });

  return {
    nfts: nfts as any,
  };
};
