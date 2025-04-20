'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import { Clock, MoreHorizontal, RefreshCw } from 'lucide-react';
import React from 'react';

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
  const filterAndSortedTransactions = transactions;

  const handleSort = (field) => {
    // Add sorting logic based on field if needed
    console.log('Sorting by:', field);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead
                className="cursor-pointer text-left"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">Date</div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer text-left"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">Category</div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-left"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end">Amount</div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filterAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="w-[50px]">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.createdAt), 'dd MMMM yyyy')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{
                        backgroundColor:
                          categoryColors[transaction.category] || '#f0f0f0',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                      className="px-2 py-1 rounded text-white text-sm font-semibold"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right font-medium"
                    style={{
                      color:
                        transaction.type === 'EXPENSE' ? 'red' : 'green',
                    }}
                  >
                    {transaction.type === 'EXPENSE' ? '-' : '+'}${' '}
                    {transaction.amount.toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {transaction.recurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className="gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                              <RefreshCw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <div className="font-medium">
                                Next Date:
                                <div>
                                  {format(
                                    new Date(
                                      transaction.nextRecurringDate
                                    ),
                                    'dd MMMM yyyy'
                                  )}
                                </div>
                              </div>
                            </div>
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
                    {/* Action buttons can go here */}
                        <DropdownMenu>

                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 ">
                              <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>

                            <DropdownMenuContent>

                              <DropdownMenuLabel>Edit</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Delete</DropdownMenuItem>

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
