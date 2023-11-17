'use client';

import { APP_ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';
import { ConnectKitButton as ConnectKitButtonNext } from 'connectkit';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoImg from '../public/logo.png';

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
  return (
    <Image
      src={LogoImg}
      width={50}
      height={50}
      alt='logo'
      className='rounded-3xl'
    />
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
          pathname === APP_ROUTES.CAMPAIGNS ? 'text-green-400' : 'text-zinc-500'
        )}
        href={APP_ROUTES.CAMPAIGNS}
      >
        Campaigns
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
      <ConnectKitButtonNext theme='midnight' />
    </div>
  );
}
