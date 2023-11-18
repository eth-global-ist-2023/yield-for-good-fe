'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useExit } from '@/hooks/web3/vault/useExit';
import { useGetUserPrincipal } from '@/hooks/web3/vault/useGetUserPrincipal';
import { ASSETS_MAPPING } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import { JsonRpcProvider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatUnits, parseEther } from 'viem';
import { useNetwork } from 'wagmi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function WithdrawDialog({ pool }: { pool: PoolType }) {
  const { chain } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [amount, setAmount] = useState('');
  const asset = ASSETS_MAPPING[pool.asset as keyof typeof ASSETS_MAPPING];
  const { data: userPrincipal, refetch } = useGetUserPrincipal(pool.poolId);
  const { writeExitAsync } = useExit();

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

    if (new BigNumber(valueInWei.toString()).gt(userPrincipal ?? '0')) {
      setAmountError('Insufficient balance');
    } else {
      setAmountError('');
    }

    setAmount(e.target.value);
  };

  const executeWithdraw = async () => {
    setBtnDisabled(true);
    const provider = new JsonRpcProvider(chain?.rpcUrls.default.http[0] as any);
    const { hash } = await writeExitAsync({
      args: [pool.poolId, parseEther(amount)],
    });

    toast('Transaction processing... 🕐');

    setTimeout(async () => {
      const txReceipt = await provider.waitForTransaction(hash);
      toast(
        txReceipt.status === 1
          ? 'Funds withdrawn successfully. Thanks for participating! ❤️️'
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
        Withdraw
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Withdraw from XYZ campaign</DialogTitle>
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
                  formatUnits(BigInt(userPrincipal), asset.decimals) ?? '0'
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
              {userPrincipal && (
                <Label>
                  Available balance:{' '}
                  {formatUnits(BigInt(userPrincipal), asset.decimals)}{' '}
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
                onClick={executeWithdraw}
              >
                Withdraw
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
