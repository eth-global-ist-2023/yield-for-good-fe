import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import VaultABI from '../../abis/vault-abi';
import { GetPoolsType } from '../types/web3';

const jsonRpcProvider = new JsonRpcProvider(
  'https://goerli.infura.io/v3/69dd7cde1cc74a0cb9e30b06b1b28792'
);

const getVaultContractInstance = () =>
  new Contract(
    process.env.NEXT_PUBLIC_VAULT_GOERLI_ADDRESS as string,
    VaultABI,
    jsonRpcProvider
  );

export const getLastPoolIdForChain = async () => {
  const vaultContract = getVaultContractInstance();
  return await vaultContract.lastPoolId();
};

export const getPoolsForChain = async (
  chainId: string
): Promise<GetPoolsType[]> => {
  const vaultContract = getVaultContractInstance();
  const lastPoolId = await vaultContract.lastPoolId();

  const promises = [];

  for (let i = 1; i <= lastPoolId; i++) {
    promises.push(vaultContract.pools(i));
  }

  return await Promise.all(promises);
};
