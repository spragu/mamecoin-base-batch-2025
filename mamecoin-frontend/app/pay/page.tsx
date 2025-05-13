"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { injected } from 'wagmi/connectors';
import Image from 'next/image'
import UsdcBalance from "../components/UsdcBalance";

export default function Pay() {
  const { address, isConnected } = useAccount();
//   const { connect } = useConnect({ connector: injected() });

  const [successTime, setSuccessTime] = useState<string | null>(null);

  useEffect(() => {
    // if (!isConnected) {
    //   connect(); // Prompt wallet connection
    //   return;
    // }

    fetch("/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    }).then(async (res) => {
      const result = await res.json();
      if (result.transactionUrl) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSuccessTime(timeString);
      }
    });
  }, [isConnected, address]);

  return (
    <div className="text-center p-8">
      {successTime ? (
        <div className="bg-green-100 p-6 rounded shadow text-green-800 max-w-md mx-auto">
            <Image 
            src="/images/payment-accepted.png" alt="Logo"
            width={800}
            height={500}
            />
            <h2 className="text-xl font-bold mb-2">🎉 Such Success!</h2>
                <p>💸 You did an arcade wow at <strong>{successTime}</strong></p>
                <UsdcBalance />
                <p>🔥 Very payment. So coin. Wow.</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Processing Payment...</h1>
          <p>Please confirm the transaction in your wallet if prompted.</p>
        </>
      )}
    </div>
  );
}
