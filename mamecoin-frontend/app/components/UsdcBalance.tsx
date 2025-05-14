import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base

const UsdcBalance = () => {
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError } = useBalance({
    address,
    token: USDC_ADDRESS as `0x${string}`,
    query: {
      refetchInterval: 5000, // poll every 1 second
    },
  });

  if (!isConnected) return <p>Connect wallet to see balance</p>;
  if (isLoading) return <p>Loading USDC balance...</p>;
  if (isError || !data) return <p>Error fetching balance</p>;

  const balance = parseFloat(formatUnits(data.value, 6)).toFixed(2);

  return (
    <h1>
      🪙 USDC Balance: <strong>{balance}</strong>
    </h1>
  );
};

export default UsdcBalance;
