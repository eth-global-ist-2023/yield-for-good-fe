'use client';

import { APP_ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';
import { ConnectKitButton as ConnectKitButtonNext } from 'connectkit';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoImg from '../public/logo.png';
import { Button } from './ui/button';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between p-4'>
      <Logo />
      <Navigator />
      <ConnectKitButton />
    </nav>
  );
}

function Logo() {
  const router = useRouter();

  return (
    <div className='relative h-[20px] w-[170px]'>
      <Image
        onClick={() => router.push(APP_ROUTES.HOME)}
        src={LogoImg}
        fill
        alt='logo'
        className='cursor-pointer'
      />
    </div>
  );
}

function Navigator() {
  const pathname = usePathname();

  return (
    <div className='flex gap-8'>
      <Link
        className={cn(
          'text-base font-medium leading-tight text-zinc-500',
          pathname === APP_ROUTES.HOME ? 'text-green-400' : 'text-zinc-500'
        )}
        href={APP_ROUTES.HOME}
      >
        Home
      </Link>
      <Link
        className={cn(
          'text-base font-medium leading-tight text-zinc-500',
          pathname === APP_ROUTES.PROFILE ? 'text-green-400' : 'text-zinc-500'
        )}
        href={APP_ROUTES.PROFILE}
      >
        Profile
      </Link>
    </div>
  );
}

function ConnectKitButton() {
  return (
    <div className='relative right-4 h-[40px] w-[170px]'>
      <ConnectKitButtonNext.Custom>
        {({
          isConnected,
          isConnecting,
          show,
          hide,
          address,
          ensName,
          chain,
          truncatedAddress,
        }) => {
          return (
            <Button
              onClick={show}
              className='w-[178px] bg-green-500 font-bold text-white hover:bg-green-600'
            >
              {isConnected ? ensName || truncatedAddress : 'Connect'}
            </Button>
          );
        }}
      </ConnectKitButtonNext.Custom>
    </div>
  );
}
