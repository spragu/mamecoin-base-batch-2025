import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // USDC on Base Sepolia

const UsdcBalance = () => {
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError } = useBalance({
    address,
    token: USDC_ADDRESS as `0x${string}`,
    query: {
      refetchInterval: 1000, // poll every 1 second
    },
  });

  if (!isConnected) return <p>Connect wallet to see balance</p>;
  if (isLoading) return <p>Loading USDC balance...</p>;
  if (isError || !data) return <p>Error fetching balance</p>;

  const balance = parseFloat(formatUnits(data.value, 6)).toFixed(2);

  return (
    <p>
      USDC Balance: <strong>{balance}</strong>
    </p>
  );
};

export default UsdcBalance;
