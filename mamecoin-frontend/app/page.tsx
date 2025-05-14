'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import Image from 'next/image'
import Subscribe from './components/Subscribe';
import UsdcBalance from './components/UsdcBalance';
import { FundCard } from '@coinbase/onchainkit/fund';
import AppFlowModal from './components/AppFlowModal';

// const components = [
//   {
//     name: 'Transaction',
//     url: 'https://onchainkit.xyz/transaction/transaction',
//   },
//   { name: 'Swap', url: 'https://onchainkit.xyz/swap/swap' },
//   { name: 'Checkout', url: 'https://onchainkit.xyz/checkout/checkout' },
//   { name: 'Wallet', url: 'https://onchainkit.xyz/wallet/wallet' },
//   { name: 'Identity', url: 'https://onchainkit.xyz/identity/identity' },
// ];

// const templates = [
//   { name: 'NFT', url: 'https://github.com/coinbase/onchain-app-template' },
//   { name: 'Commerce', url: 'https://github.com/coinbase/onchain-commerce-template'},
//   { name: 'Fund', url: 'https://github.com/fakepixels/fund-component' },
// ];

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
   
                <Wallet>
                  <ConnectWallet>
                    <Avatar className="h-6 w-6" />
                    <Name />
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownLink
                      icon="wallet"
                      href="https://keys.coinbase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wallet
                    </WalletDropdownLink>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
          
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
