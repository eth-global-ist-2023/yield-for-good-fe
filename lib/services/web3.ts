import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import ERC20ABI from '../../abis/erc20-abi';
import VaultABI from '../../abis/vault-abi';
import { PoolType } from '../types/web3';

const jsonRpcProvider = new JsonRpcProvider(
  'https://goerli.infura.io/v3/69dd7cde1cc74a0cb9e30b06b1b28792'
);

const getVaultContractInstance = () =>
  new Contract(
    process.env.NEXT_PUBLIC_VAULT_GOERLI_ADDRESS as string,
    VaultABI,
    jsonRpcProvider
  );

const getERC20ContractInstance = (address: string) =>
  new Contract(address as string, ERC20ABI, jsonRpcProvider);

export const getLastPoolIdForChain = async () => {
  const vaultContract = getVaultContractInstance();
  return await vaultContract.lastPoolId();
};

export const getPoolsForChain = async (
  chainId: string
): Promise<PoolType[]> => {
  const vaultContract = getVaultContractInstance();
  const lastPoolId = await vaultContract.lastPoolId();

  const promises = [];

  for (let i = 1; i <= lastPoolId; i++) {
    promises.push(vaultContract.pools(i));
  }

  return (await Promise.all(promises)).map((resp, idx) => ({
    ...resp,
    poolId: idx + 1,
  }));
};

export const claimYield = async (poolId: number) => {
  const vaultContract = getVaultContractInstance();

  return await vaultContract.exit(poolId);
};

export const getAccruedYieldForPool = async (poolId: number) => {
  const vaultContract = getVaultContractInstance();

  return await vaultContract.getAccruedYieldForPool(poolId);
};
