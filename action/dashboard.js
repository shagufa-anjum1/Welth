"use server";

import { db } from "@/lib/prisma"; // Ensure db is correctly imported
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Serialize transaction/account object if needed
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }

  return serialized;
};

export async function createAccount(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Find the user in your database by Clerk User ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance");
    }

    // Check if this is the user's first account
    const userAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const ShouldBeDefault = userAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, set others to false
    if (ShouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create new account
    const account = await db.account.create({
      data: {
        ...data,
        userId: user.id,
        balance: balanceFloat,
        isDefault: ShouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);

    // Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true, data: serializedAccount };

  } catch (error) {
    console.error("Create Account Error:", error.message);
    throw new Error(error.message);
  }
}


export async function getUserAccounts() {

    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Find the user in your database by Clerk User ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const accounts = await db.account.findMany

}