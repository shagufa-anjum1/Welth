"use client";

import React, { useState } from "react";
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
} from "@/components/ui/select"; // ✅ shadcn/ui Select
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

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
      type: "", // Leave blank to show placeholder first
      balance: "",
      isDefault: false,
    },
  });

  const onSubmit = async(data) => {
    console.log(data);
    reset(); // Reset form
    setOpen(false); // Close drawer on submit
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
            {/* Account Name */}
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
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-gray-700">
                Account Type
              </label>

              <Select
                onValueChange={(value) => setValue("type", value)}
                value={watch("type")} // ✅ controlled value for correct display
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue
                    placeholder="Select Account Type" // ✅ placeholder visible if no value selected
                  />
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

            {/* Initial Balance */}

            <div className="space-y-2">
              <label htmlFor="Balance" className="text-sm font-medium text-gray-700">
                Initial Balance
              </label>
              <Input
                type="Number"
                id="Balance"
                step="0.01"
                placeholder="e.g. 0000.00"
                {...register("Balance")}
                className="w-full"
              />
              {errors.Balance && (
                <p className="text-sm text-red-500">
                  {errors.Balance.message}
                </p>
              )}
            </div>

            {/* Default Account */}
            <div className="flex items-center justify-between rounded-lg border p-3">
               <div className="space-y-0.5">
                  <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">
                    Set as Default
                  </label>
                  <p className="text-sm text-gray-500">
                    This account will be selected by default for transactions
                  </p>
                </div>
              
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={watch("isDefault")}
                />
              </div>
            

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
                <DrawerClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DrawerClose>

                <Button type="submit" className="flex-1">
                  Create Account
                </Button>
              </div>

          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
