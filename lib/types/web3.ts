export type PoolType = {
  asset: string;
  poolOwner: string;
  yieldSource: string;
  poolId: number;
  totalAssetPrincipal: bigint;
  totalSharesDelegated: bigint;
};
