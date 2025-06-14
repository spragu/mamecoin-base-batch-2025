"use client";
import { cn, color, pressable, text } from "@coinbase/onchainkit/theme";
import { useEffect, useState } from "react";
import {
  useAccount,
  useChainId,
  useConnect,
  useConnectors,
  useSignTypedData,
} from "wagmi";
import { Address, Hex, parseUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import { spendPermissionManagerAddress } from "@/lib/abi/SpendPermissionManager";

export default function Subscribe() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [signature, setSignature] = useState<Hex>();
  const [spendPermission, setSpendPermission] = useState<object>();
  const [amount, setAmount] = useState<number>(1);            // ← new state

  const { signTypedDataAsync } = useSignTypedData();
  const account = useAccount();
  const chainId = useChainId();
  const { connectAsync } = useConnect();
  const connectors = useConnectors();

  const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");

  const { data } = useQuery({
    queryKey: ["collectSubscription"],
    queryFn: handleCollectSubscription,
    refetchOnWindowFocus: false,
    enabled: !!signature,
  });

  // When the user clicks “Subscribe”
  async function handleSubmit() {
    setIsDisabled(true);

    // ensure we have an address
    let accountAddress = account.address;
    if (!accountAddress) {
      try {
        const requestAccounts = await connectAsync({
          connector: connectors[0],
        });
        accountAddress = requestAccounts.accounts[0];
      } catch {
        setIsDisabled(false);
        return;
      }
    }

    // Build permission with dynamic amount
    const spendPermission = {
        account: accountAddress as Address,
        spender: process.env.NEXT_PUBLIC_SPENDER_ADDRESS! as Address,
        token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
        allowance: parseUnits("1.00", 6),  // ← use `amount`
        period: 86400,
        start: 0,
        end: 281474976710655,
        salt: BigInt(0),
        extraData: "0x" as Hex,
      };

    try {
      const sig = await signTypedDataAsync({
        domain: {
          name: "Spend Permission Manager",
          version: "1",
          chainId: chainId!,
          verifyingContract: spendPermissionManagerAddress,
        },
        types: {
          SpendPermission: [
            { name: "account", type: "address" },
            { name: "spender", type: "address" },
            { name: "token", type: "address" },
            { name: "allowance", type: "uint160" },
            { name: "period", type: "uint48" },
            { name: "start", type: "uint48" },
            { name: "end", type: "uint48" },
            { name: "salt", type: "uint256" },
            { name: "extraData", type: "bytes" },
          ],
        },
        primaryType: "SpendPermission",
        message: spendPermission,
      });
      setSpendPermission(spendPermission);
      setSignature(sig);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDisabled(false);
    }
  }

  // same as before
  async function handleCollectSubscription() {
    setIsDisabled(true);
    try {
      const replacer = (_: string, value: unknown) =>
        typeof value === "bigint" ? value.toString() : value;

      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spendPermission, signature }, replacer),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
    } finally {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    if (data) {
      // Show modal instead of pushing tx
      setModalMessage("✅ Spending permission has been allocated\nTime to TAP. PAY. PLAY. \nYou can close this window/tab");
      setShowModal(true);
    }
  }, [data]);

  return (
    <div className="space-y-6 w-[450px]">
      {!signature ? (
        <>
          {/* New: amount selector */}
          <label className="block text-sm font-medium">
            Choose subscription (USDC/day):
<select
  value={amount}
  onChange={(e) => setAmount(Number(e.target.value))}
  disabled={isDisabled}
  className={cn(
    pressable.primary,
    "w-full rounded-xl px-4 py-3 font-medium text-base leading-6",
    isDisabled && pressable.disabled,
    text.headline,
    color.inverse  // makes the text white
  )}
>
  {[1, 5, 10, 20].map((opt) => (
    <option key={opt} value={opt}>
      {opt} USDC
    </option>
  ))}
</select>
          </label>

          {/* Subscribe button */}
          <button
            className={cn(
              pressable.primary,
              "w-full rounded-xl px-4 py-3 font-medium text-base text-white leading-6",
              isDisabled && pressable.disabled,
              text.headline
            )}
            onClick={handleSubmit}
            disabled={isDisabled}
            data-testid="ockTransactionButton_Button"
          >
            <span className={cn(text.headline, color.inverse, "flex justify-center")}>
              Allocate {amount} USDC to arcade spending limit
            </span>
          </button>
        </>
      ) : (
        <div className="space-y-8">
          <div className="h-80 space-y-4">
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center space-y-4">
                    <h2 className="text-2xl text-gray-800 font-bold">Such Success! 🎯</h2>
                    <p className="text-lg whitespace-pre-line text-gray-800">{modalMessage}</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
