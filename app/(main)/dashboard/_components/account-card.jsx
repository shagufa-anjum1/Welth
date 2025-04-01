"use client";

import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // ✅ Make sure these exist
import { Switch } from "@/components/ui/switch"; // ✅ If you have a custom Switch
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/action/accounts";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updateAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least one Default account");
      return;
    }

    await updateDefaultFn(id); // Make the call to update the default account
  };

  useEffect(() => {
    if (updateAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updateAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
          <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading} />
        </CardHeader>

        <CardContent>
          <p className="text-xx text-muted-fore mt-2">₹ {balance}</p>
          <p className="text-sm text-muted-foreground capitalize">Type: {type}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>

          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
