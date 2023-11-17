import { ReactNode } from 'react';
import ConnectKitProvider from './ConnectKitProvider';


function Providers({ children }: { children: ReactNode }) {
  return (
    <ConnectKitProvider>
      {children}
    </ConnectKitProvider>
  );
}

export default Providers;
