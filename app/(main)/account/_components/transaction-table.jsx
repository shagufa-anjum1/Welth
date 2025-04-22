'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

const RECURRING_INTERVALS = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
  BIWEEKLY: 'Biweekly',
  QUARTERLY: 'Quarterly',
  SEMIANNUAL: 'Semiannual',
  ANNUAL: 'Annual',
  ONETIME: 'Onetime',
  NONE: 'None',
};

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState({
    field: 'date',
    direction: 'ascending',
  });

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const handleEdit = (id) => {
    router.push(`/transactions/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      // For now just log it, later integrate API call
      console.log(`Deleting transaction with id: ${id}`);
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const aVal = a[sortConfig.field];
    const bVal = b[sortConfig.field];
    return aVal < bVal ? (sortConfig.direction === 'ascending' ? -1 : 1)
         : aVal > bVal ? (sortConfig.direction === 'ascending' ? 1 : -1)
         : 0;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><Checkbox /></TableHead>
              <TableHead onClick={() => handleSort('date')} className="cursor-pointer">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead onClick={() => handleSort('category')} className="cursor-pointer">Category</TableHead>
              <TableHead onClick={() => handleSort('amount')} className="cursor-pointer text-right">Amount</TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              sortedTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>{format(new Date(tx.createdAt), 'dd MMM yyyy')}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{
                        backgroundColor: categoryColors[tx.category] || '#f0f0f0',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium" style={{ color: tx.type === 'EXPENSE' ? 'red' : 'green' }}>
                    {tx.type === 'EXPENSE' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {tx.recurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className="gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                              <RefreshCw className="h-3 w-3" />
                              {RECURRING_INTERVALS[tx.recurringInterval]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            Next: {format(new Date(tx.nextRecurringDate), 'dd MMM yyyy')}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        On-Time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(tx.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(tx.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
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
