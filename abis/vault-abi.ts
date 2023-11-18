const vaultAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AddressZero', type: 'error' },
  { inputs: [], name: 'NotEnoughFundsToWithdraw', type: 'error' },
  { inputs: [], name: 'NotOwnerOfPool', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'PoolDoesNotExist', type: 'error' },
  { inputs: [], name: 'YieldSourceNotSupported', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'yieldSource',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingAsset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'poolOwner',
        type: 'address',
      },
    ],
    name: 'PoolCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingAsset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PoolEntered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingAsset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PoolExited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'yieldSource',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isSupported',
        type: 'bool',
      },
    ],
    name: 'UpdateSupportedYieldSource',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingAsset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'yieldSource',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'YieldClaimed',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'poolId', type: 'uint256' }],
    name: 'claimYield',
    outputs: [
      { internalType: 'uint256', name: 'yieldForClaim', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'yieldSource', type: 'address' }],
    name: 'createPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'poolId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'enter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'poolId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'poolId', type: 'uint256' }],
    name: 'getAccruedYieldForPool',
    outputs: [
      { internalType: 'uint256', name: 'accruedYield', type: 'uint256' },
      { internalType: 'address', name: 'underlyingAsset', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'poolId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUserPrincipal',
    outputs: [
      { internalType: 'uint256', name: 'userPrincipal', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastPoolId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'pools',
    outputs: [
      { internalType: 'address', name: 'poolOwner', type: 'address' },
      { internalType: 'address', name: 'yieldSource', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
      {
        internalType: 'uint256',
        name: 'totalSharesDelegated',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'totalAssetPrincipal', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_yfgSoulbound', type: 'address' },
    ],
    name: 'setYFGSoulbound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'supportedYieldSources',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'yieldSource', type: 'address' },
      { internalType: 'bool', name: 'isSupported', type: 'bool' },
    ],
    name: 'updateSupportedYieldSource',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'yfgSoulbound',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export default vaultAbi;
