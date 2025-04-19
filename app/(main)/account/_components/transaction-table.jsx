'use client'; // ✅ Add this line

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'

const TransactionTable = ({transactions}) => {
  const handlesort = () => {

  }

  return (
    <div className='space-y-4'>
         <div className='rounded-md border bg-card shadow-sm'>
          <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-[50px]">
                  <Checkbox/>
                 </TableHead>
                 <TableHead className="cursor-pointer text-left"
                  onClick={ () => handlesort("date") }
                 >
                   <div className='flex items-center'>Date</div>
                 </TableHead>
                 <TableHead>Description</TableHead>
                 <TableHead className="cursor-pointer text-left"
                  onClick={ () => handlesort("category") }
                 >
                   <div className='flex items-center'>Category</div>
                 </TableHead>
                 <TableHead className="cursor-pointer text-left"
                  onClick={ () => handlesort("ammount") }
                 >
                   <div className='flex items-center justify-end'>Amount</div>
                 </TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               <TableRow>
                 <TableCell className="font-medium">INV001</TableCell>
                 <TableCell>Paid</TableCell>
                 <TableCell>Credit Card</TableCell>
                 <TableCell className="text-right">$250.00</TableCell>
               </TableRow>
             </TableBody>
          </Table>
        </div>
    </div>
  );
}

export default TransactionTable;
