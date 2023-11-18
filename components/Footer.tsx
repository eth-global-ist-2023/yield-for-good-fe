'use client';

import { APP_ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImg from '../public/eth-global.svg';

export default function Footer() {
  return (
    <nav className='h-15 mt-20 flex w-full items-center justify-between border-t-2 border-zinc-100 p-[8px]'>
      <Logo />
      <Navigator />
    </nav>
  );
}

function Logo() {
  return (
    <div className='relative h-[50px] w-[170px]'>
      <a
        href='https://ethglobal.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer'
      >
        <Image src={LogoImg} fill alt='logo' />
      </a>
    </div>
  );
}

function Navigator() {
  return (
    <div className='flex gap-8'>
      <Link
        className={cn(
          'text-base font-medium leading-tight text-zinc-500',
          'text-zinc-500'
        )}
        target='_blank'
        href={'https://github.com/eth-global-ist-2023'}
      >
        <Github />
      </Link>

      <Link
        className={cn(
          'mr-4 text-base font-medium leading-tight text-zinc-500',
          'text-zinc-500'
        )}
        href={APP_ROUTES.HOME}
      >
        © 2023 YieldForGood
      </Link>
    </div>
  );
}
