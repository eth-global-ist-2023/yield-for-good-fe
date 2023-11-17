'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function WithdrawDialog() {
  const [amountError, setAmountError] = useState('');
  const [amount, setAmount] = useState(0);

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger className='bg-green-500 p-2 px-4 text-sm text-white transition delay-150 duration-300 hover:bg-green-600'>
        Withdraw
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Withdraw from XYZ campaign</DialogTitle>
          <DialogDescription className='relative flex flex-col'>
            <Input onChange={handleChange} />
            <Label className='text-md absolute right-2 top-2 cursor-pointer font-bold text-green-500'>
              Max
            </Label>
            <Button className='mt-4 self-end bg-green-500 text-white transition delay-150 duration-300 hover:bg-green-600'>
              Withdraw
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
