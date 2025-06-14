'use client';

import { base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';
import { cookieStorage, createConfig, createStorage, http, State, WagmiProvider } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      preference: process.env.NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG as
        | "smartWalletOnly"
        | "all",
      // @ts-expect-error why must i explain an error
      keysUrl: "https://keys.coinbase.com/connect"
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={props.initialState}>
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID} 
          chain={base}
          config={{ appearance: { 
            mode: 'auto',
        }
      }}
    >
      {props.children}
    </OnchainKitProvider>
    </WagmiProvider>
  );
}

