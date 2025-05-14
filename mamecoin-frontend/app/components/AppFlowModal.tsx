'use client';

import { useState, useEffect } from 'react';

export default function AppFlowModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenAppFlow');
    if (!hasSeen) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenAppFlow', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-lg mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">🎮 Wow! Such Arcade!</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-left">
          <li>
            🦊 Connect your wallet or create a <strong>smart account</strong> with Passkey (so fast, very easy).
          </li>
          <li>
            💸 Add some <strong>USDC</strong> using your own wallet or our magic funding card ✨.
          </li>
          <li>
            🎟️ Approve a daily <strong>arcade pass</strong> so tiny payments go zoom 🚀.
          </li>
          <li>
            📱 Tap your phone at a game and boom 💥 — <strong>Tap, Pay & Play</strong>, no wait!
          </li>
        </ol>
        <div className="text-center mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            ✅ Got it — so play, much fun!
          </button>
        </div>
      </div>
    </div>
  );
}
