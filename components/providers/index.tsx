import { ReactNode } from 'react';
import ConnectKitProvider from './ConnectKitProvider';
import ToastProvider from './ToastProvider';

function Providers({ children }: { children: ReactNode }) {
  return (
    <ConnectKitProvider>
      {children}
      <ToastProvider />
    </ConnectKitProvider>
  );
}

export default Providers;
