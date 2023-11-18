'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useApprove } from '@/hooks/web3/erc20/useApprove';
import { useGetAllowance } from '@/hooks/web3/erc20/useGetAllowance';
import { useGetBalance } from '@/hooks/web3/erc20/useGetBalance';
import { useEnter } from '@/hooks/web3/vault/useEnter';
import { ASSETS_MAPPING } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import { BigNumber } from 'bignumber.js';
import { useState } from 'react';
import { formatUnits, maxUint256, parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function DepositDialog({ pool }: { pool: PoolType }) {
  const asset = ASSETS_MAPPING[pool.asset as keyof typeof ASSETS_MAPPING];

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const allowance = useGetAllowance(pool.asset);
  const { address } = useAccount();
  const erc20Balance = useGetBalance(pool.asset);
  const { writeApproveAsync } = useApprove(pool.asset);
  const { writeEnterAsync } = useEnter();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/;

    if (value !== '' && !regex.test(value)) {
      return;
    }

    // NOTE: for decimals !== 18 is not going to work
    const valueInWei = parseEther(value);

    if (new BigNumber(valueInWei.toString()).gt(erc20Balance ?? '0')) {
      setAmountError('Insufficient balance');
    } else {
      setAmountError('');
    }

    setAmount(e.target.value);
  };

  const executeDeposit = async () => {
    if (!address) {
      return;
    }

    if (new BigNumber(allowance).eq(0)) {
      await writeApproveAsync({
        args: [process.env.NEXT_PUBLIC_VAULT_GOERLI_ADDRESS, maxUint256],
      });
    }

    // NOTE: for decimals !== 18 is not going to work
    await writeEnterAsync({
      args: [pool.poolId, parseEther(amount)],
    });
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setAmount('');
        }
      }}
    >
      <DialogTrigger className='bg-green-500 p-2 px-4 text-sm text-white transition delay-150 duration-300 hover:bg-green-600'>
        Deposit
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Deposit to XYZ campaign</DialogTitle>
          <DialogDescription className='relative flex flex-col'>
            <Input
              value={amount}
              onChange={handleChange}
              className='select-none'
            />
            <Label
              className='text-md absolute right-2 top-2 cursor-pointer font-bold text-green-500'
              onClick={() =>
                setAmount(
                  formatUnits(BigInt(erc20Balance), asset.decimals) ?? '0'
                )
              }
            >
              Max
            </Label>
            <div className='mt-4 flex items-center justify-between'>
              {amountError && (
                <Label className='absolute top-11 text-red-500'>
                  {amountError}
                </Label>
              )}
              {erc20Balance && (
                <Label>
                  Available balance:{' '}
                  {formatUnits(BigInt(erc20Balance), asset.decimals)}{' '}
                  {asset.symbol}
                </Label>
              )}
              <Button
                disabled={
                  !amount ||
                  new BigNumber(amount).lte(0) ||
                  Boolean(amountError)
                }
                className='self-end bg-green-500 text-white transition delay-150 duration-300 hover:bg-green-600'
                onClick={executeDeposit}
              >
                Deposit
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
