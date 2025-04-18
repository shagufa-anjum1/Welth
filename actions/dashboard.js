"use server";

import { db } from "@/lib/prisma"; // Prisma client instance
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Serialize account/transaction object to convert BigInt (or Decimal) fields into numbers
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

// Create a new account function
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

    const shouldBeDefault = userAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, set others to false
    if (shouldBeDefault) {
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
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);

    // Revalidate the dashboard page after creating account
    revalidatePath("/dashboard");

    return { success: true, data: serializedAccount };
  } catch (error) {
    console.error("Create Account Error:", error.message);
    throw new Error(error.message);
  }
}

// Get user accounts function
export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    // Serialize accounts before sending to client
    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error) {
    console.error(error.message);
  }
}
