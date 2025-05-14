require("dotenv").config();
const { ethers } = require("ethers");

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base Mainnet USDC

// USDC ABI (simplified)
const USDC_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const main = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const walletAddress = process.env.YOUR_ADDRESS.toLowerCase();
  const contract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);

  console.log(`👂 Listening for incoming USDC transfers to ${walletAddress} on Base...`);

  contract.on("Transfer", (from, to, value, event) => {
    if (to.toLowerCase() === walletAddress) {
      console.log(`💰 Received USDC from ${from}`);
      console.log(`   Amount: ${ethers.formatUnits(value, 6)} USDC`);
      console.log(`   Tx Hash: ${event.transactionHash}`);
    }
  });
};

main().catch((err) => {
  console.error("Error starting listener:", err);
});
