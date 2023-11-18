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
import { ASSETS_MAPPING, VAULT_REGISTRY } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'bignumber.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatUnits, maxUint256, parseEther } from 'viem';
import { useAccount, useNetwork } from 'wagmi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function DepositDialog({ pool }: { pool: PoolType }) {
  const asset = ASSETS_MAPPING[pool.asset as keyof typeof ASSETS_MAPPING];

  const [isOpen, setIsOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const { chain } = useNetwork();
  const allowance = useGetAllowance(pool.asset);
  const { address } = useAccount();
  const { data: erc20Balance, refetch } = useGetBalance(pool.asset);
  const { writeApproveAsync } = useApprove(pool.asset);
  const { writeEnterAsync } = useEnter();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

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

    setBtnDisabled(true);

    const provider = new JsonRpcProvider(chain?.rpcUrls.default.http[0] as any);

    if (new BigNumber(allowance).eq(0)) {
      const vaultAddress =
        VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
        VAULT_REGISTRY[5];

      const { hash } = await writeApproveAsync({
        args: [vaultAddress, maxUint256],
      });

      await provider.waitForTransaction(hash);
    }

    // NOTE: for decimals !== 18 is not going to work
    const { hash } = await writeEnterAsync({
      args: [pool.poolId, parseEther(amount)],
    });

    toast('Transaction processing... 🕐');

    setTimeout(async () => {
      const txReceipt = await provider.waitForTransaction(hash);
      toast(
        txReceipt.status === 1
          ? 'Successful deposited! 🚀'
          : 'Something went wrong! 😥'
      );
    }, 0);

    document.getElementById('closeDialog')?.click();
    setBtnDisabled(false);
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        if (!isOpen) {
          setAmount('');
        }
      }}
    >
      <DialogTrigger className='rounded-xl bg-green-500 p-2 px-4 text-sm text-white transition delay-150 duration-300 hover:bg-green-600'>
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
                  btnDisabled ||
                  !amount ||
                  new BigNumber(amount).lte(0) ||
                  Boolean(amountError)
                }
                className='self-end rounded-xl bg-green-500 text-white transition delay-150 duration-300 hover:bg-green-600'
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
