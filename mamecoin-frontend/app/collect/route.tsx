// app/api/collect/route.ts
import { NextResponse } from "next/server";
import { getPublicClient, getSpenderWalletClient } from "@/lib/spender";
import {
  spendPermissionManagerAbi,
  spendPermissionManagerAddress,
} from "@/lib/abi/SpendPermissionManager";
import { Address, Hex } from "viem";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const spenderBundlerClient = await getSpenderWalletClient();
    const publicClient = await getPublicClient();

    const spendPermission = {
      account: address as Address,
      spender: process.env.NEXT_PUBLIC_SPENDER_ADDRESS! as Address,
      token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
      allowance: "1000000",  // $1.00 USDC in 6 decimals
      period: 86400,
      start: 0,
      end: 281474976710655,
      salt: BigInt(0),
      extraData: "0x" as Hex,
    };

    const spendTxnHash = await spenderBundlerClient.writeContract({
      address: spendPermissionManagerAddress,
      abi: spendPermissionManagerAbi,
      functionName: "spend",
      args: [spendPermission, "10000"], // 1 cent for example
    });

    const spendReceipt = await publicClient.waitForTransactionReceipt({
      hash: spendTxnHash,
    });

    return NextResponse.json({
      status: spendReceipt.status ? "success" : "failure",
      transactionHash: spendReceipt.transactionHash,
      transactionUrl: `https://basescan.org/tx/${spendReceipt.transactionHash}`,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
