import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { NFT_ABI } from '../../../abis/nft-abi';
import { useGetNftAddress } from './useGetNftAddress';

export const useGetNfts = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { yfgSoulbound } = useGetNftAddress();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const { data } = useContractRead({
    address: yfgSoulbound as any,
    abi: NFT_ABI,
    functionName: 'ownedTokens',
    args: [address],
    enabled: Boolean(address),
  });

  return {
    data: ((data as any) ?? '').toString(),
    refetch: null,
  };
};
