export type PoolType = {
  title: string;
  description: string;
  imageURI: string;
  poolOwner: string;
  yieldSource: string;
  asset: string;
  totalSharesDelegated: bigint;
  totalAssetPrincipal: bigint;
  creationDate: number;
  totalParticipants: number;
  poolId: number;
};
