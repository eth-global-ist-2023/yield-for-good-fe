'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BigNumber } from 'bignumber.js';
import { useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function DepositDialog() {
  const { address } = useAccount();
  const [amountError, setAmountError] = useState('');
  const { data: balance } = useBalance({ address });
  const [amount, setAmount] = useState('');

  const handleChange = (e: any) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/;

    if (value !== '' && !regex.test(value)) {
      return;
    }

    const valueInWei = parseEther(value);

    if (
      new BigNumber(valueInWei.toString()).gt(balance?.value.toString() ?? '0')
    ) {
      setAmountError('Insufficient balance');
    } else {
      setAmountError('');
    }

    setAmount(e.target.value);
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
              onClick={() => setAmount(balance?.formatted ?? '0')}
            >
              Max
            </Label>
            <div className='mt-4 flex items-center justify-between'>
              {amountError && (
                <Label className='absolute top-11 text-red-500'>
                  {amountError}
                </Label>
              )}
              {balance && <Label>Available balance: {balance.formatted}</Label>}
              <Button
                disabled={
                  !amount ||
                  new BigNumber(amount).lte(0) ||
                  Boolean(amountError)
                }
                className='self-end bg-green-500 text-white transition delay-150 duration-300 hover:bg-green-600'
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
