import { NextRequest, NextResponse } from "next/server";
import { getPublicClient, getSpenderWalletClient } from "../../lib/spender";
import {
  spendPermissionManagerAbi,
  spendPermissionManagerAddress,
} from "../../lib/abi/SpendPermissionManager";
 
export async function POST(request: NextRequest) {
  const spenderBundlerClient = await getSpenderWalletClient();
  const publicClient = await getPublicClient();
  try {
    const body = await request.json();
    const { spendPermission, signature } = body;
    console.log("Spend perm: " + JSON.stringify(spendPermission))
 
    const approvalTxnHash = await spenderBundlerClient.writeContract({
      address: spendPermissionManagerAddress,
      abi: spendPermissionManagerAbi,
      functionName: "approveWithSignature",
      args: [spendPermission, signature],
    });
 
    const approvalReceipt = await publicClient.waitForTransactionReceipt({
      hash: approvalTxnHash,
    });
 
    return NextResponse.json({
      status: approvalReceipt.status ? "success" : "failure",
      transactionHash: approvalReceipt.transactionHash,
      transactionUrl: `https://sepolia.basescan.org/tx/${approvalReceipt.transactionHash}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}