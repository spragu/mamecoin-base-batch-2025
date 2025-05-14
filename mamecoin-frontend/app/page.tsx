'use client';

import {
  WalletAdvancedDefault,
} from '@coinbase/onchainkit/wallet';

import Image from 'next/image'
import Subscribe from './components/Subscribe';
import UsdcBalance from './components/UsdcBalance';
import { FundCard } from '@coinbase/onchainkit/fund';
import AppFlowModal from './components/AppFlowModal';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <AppFlowModal />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full">

        <div className="w-2/3 mx-auto mb-6">
            <Image 
              src="/images/logo2.png" alt="Logo"
              width={800}
              height={500}
            />
          </div>

          <div className="flex justify-center mb-6">
            <div className="wallet-container">
            <WalletAdvancedDefault />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <UsdcBalance />            
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md">
              <FundCard
                assetSymbol="USDC"
                country="US"
                currency="USD"
              />
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <Subscribe />            
          </div>
        </div>
      </main>
    </div>
  );
}
