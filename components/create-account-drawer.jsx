"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/action/dashboard";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateAccountDrawer = ({ children, userId }) => {
  const [open, setOpen] = useState(false);

  // ✅ react-hook-form setup with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "",
      balance: "",
      isDefault: false,
    },
  });

  // ✅ Custom hook for API call
  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  // ✅ Success handler - runs when newAccount is successfully created
  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully!");
      reset();        // ✅ Reset the form fields
      setOpen(false); // ✅ Close the drawer
    }
  }, [newAccount, createAccountLoading]); // ✅ No reset / setOpen here!

  // ✅ Error handler - runs when there is an error in createAccount
  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }, [error]);

  // ✅ Form submission handler
  const onSubmit = async (formData) => {
    try {
      await createAccountFn({ ...formData, userId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 py-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* ✅ Account Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Account Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="e.g. Main Checking"
                {...register("name")}
                className="w-full"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* ✅ Account Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-gray-700">
                Account Type
              </label>

              <Select
                onValueChange={(value) => setValue("type", value)}
                value={watch("type")}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* ✅ Initial Balance */}
            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium text-gray-700">
                Initial Balance
              </label>
              <Input
                type="number"
                id="balance"
                step="0.01"
                placeholder="e.g. 1000.00"
                {...register("balance")}
                className="w-full"
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* ✅ Default Account */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">
                  Set as Default
                </label>
                <p className="text-sm text-gray-500">
                  This account will be selected by default for transactions.
                </p>
              </div>

              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
            </div>

            {/* ✅ Submit & Cancel Buttons */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
