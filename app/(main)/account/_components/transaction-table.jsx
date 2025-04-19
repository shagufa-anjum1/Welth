'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import React from 'react';

const TransactionTable = ({ transactions }) => {
  const filterAndSortedTransactions = transactions;
  const handlesort = () => {
    // Sorting logic here if needed
  };

  return (
    <div className='space-y-4'>
      <div className='rounded-md border bg-card shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><Checkbox /></TableHead>
              <TableHead className="cursor-pointer text-left" onClick={() => handlesort("date")}>
                <div className='flex items-center'>Date</div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer text-left" onClick={() => handlesort("category")}>
                <div className='flex items-center'>Category</div>
              </TableHead>
              <TableHead className="cursor-pointer text-left" onClick={() => handlesort("amount")}>
                <div className='flex items-center justify-end'>Amount</div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filterAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="w-[50px]"><Checkbox /></TableCell>
                  <TableCell>{format(new Date(transaction.createdAt), "dd MMMM yyyy")}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                  <span style={{ 

                    backgroundColor: categoryColors[transaction.category] || "#f0f0f0",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",

                   }}
                   className='px-2 py-1 rounded text-white text-sm font-semibold'
                  > 
                  {transaction.category}
                  </span>
                  </TableCell>
                  <TableCell className="text-right">{transaction.amount}</TableCell>
                  <TableCell>{transaction.recurring ? "Yes" : "No"}</TableCell>
                  <TableCell className="w-[50px]">{/* Action buttons */}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
