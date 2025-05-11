import { NextResponse } from "next/server";
import { getPublicClient, getSpenderWalletClient } from "../../lib/spender";
import {
  spendPermissionManagerAbi,
  spendPermissionManagerAddress,
} from "../../lib/abi/SpendPermissionManager";
import { Address, Hex, parseUnits } from "viem";
 
export async function GET() {
    
  const spenderBundlerClient = await getSpenderWalletClient();
  const publicClient = await getPublicClient();
  try {
        // Build permission with dynamic amount
        const spendPermission = {
          account: process.env.NEXT_PLAYER_PUBLIC_SPENDER_ADDRESS! as Address,//TODO we need to be getting this from a db or something dynamic. this is just for the demo
          spender: process.env.NEXT_PUBLIC_SPENDER_ADDRESS! as Address,
          token: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address,
          allowance: "1000000",  // ← use `amount`
          period: 86400,
          start: 0,
          end: 281474976710655,
          salt: BigInt(0),
          extraData: "0x" as Hex,
        };
    // const body = await request.json();
    // const { spendPermission } = body;
 
    const spendTxnHash = await spenderBundlerClient.writeContract({
      address: spendPermissionManagerAddress,
      abi: spendPermissionManagerAbi,
      functionName: "spend",
      args: [spendPermission, "10000"],
    });
 
    const spendReceipt = await publicClient.waitForTransactionReceipt({
      hash: spendTxnHash,
    });
 
    return NextResponse.json({
      status: spendReceipt.status ? "success" : "failure",
      transactionHash: spendReceipt.transactionHash,
      transactionUrl: `https://sepolia.basescan.org/tx/${spendReceipt.transactionHash}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}