import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // ✅ Make sure these exist
import { Switch } from '@/components/ui/switch'; // ✅ If you have a custom Switch

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <Switch defaultChecked={isDefault} /> {/* ✅ Shows if it's default */}
      </CardHeader>

      <CardContent>
      <p className="text-xl font-bold mt-2">₹ {balance}</p>
        <p className="text-sm text-muted-foreground capitalize">Type: {type}</p>
       
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Example footer actions */}
        <button className="text-sm text-blue-500 hover:underline">Edit</button>
        <button className="text-sm text-red-500 hover:underline">Delete</button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
