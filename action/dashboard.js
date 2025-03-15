"use server";

import { db } from "@/lib/prisma"; // Ensure db is correctly imported
import { auth } from "@clerk/nextjs/server";

const serializeTransaction = (obj) => {
   const serialized = { ...obj };

   if(obj.balance){
    serialized.balance = obj.balance.toNumber(); // Fixed typo: balace → balance
   }
}

export async function createAccount(data) {
    try {
        const { userId } = await auth(); // Fixed typo from userid to userId
        
        if (!userId) throw new Error("Unauthorized"); // Fixed condition check

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }, // Fixed typo: clerküserid → clerkUserId
        });

        if (!user) {
            throw new Error("User not found"); // Fixed condition check
        }

        // You can proceed with account creation logic here

        // convert balance to float before saving
        const balanceFloat = parseFloat(data.balance); // Fixed typo: balace → balance
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance");
        } 

        // check this a user first account
        const userAccounts = await db.account.findMany({
            where: { userId: user.id },
        });

        const ShouldBeDefault = 
          existingAccounts.length===0 ? true: data.isDefault;

        // if this account is should be default, update all other accounts
        if (ShouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id,  isDefault: true },
                data: { isDefault: false },
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                userId: user.id,
                balance: balanceFloat,
                isDefault: ShouldBeDefault,
            },
        });

    } catch (error) {
        console.error(error); // Log the error properly
        throw new Error("Something went wrong");
    }
}