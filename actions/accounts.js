"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Helper function to serialize transaction objects
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance && typeof obj.balance.toNumber === "function") {
    serialized.balance = obj.balance.toNumber();
  }

  if (obj.amount && typeof obj.amount.toNumber === "function") {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

// Main function to update the default account
export async function updateDefaultAccount(accountId) {
  try {
    // Get the Clerk user ID from the authenticated session
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Find the user in the database using Clerk's User ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Update the default account status (set to false for all accounts first)
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    // Update the selected account to be the default
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    // Trigger revalidation of the '/dashboard' path
    revalidatePath("/dashboard");

    // Return the updated account data after serialization
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    // Handle any errors that occur
    return { success: false, error: error.message };
  }
}

export async function getAccountWithTransactions(accountId) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  return {
    ...serializeTransaction(account),
    transactions: account.transactions.map(t => serializeTransaction(t)),
  };
}
