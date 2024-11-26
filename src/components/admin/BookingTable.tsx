import React from 'react';
import { format } from 'date-fns';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Check, X, Link as LinkIcon } from 'lucide-react';
import { Booking } from '../../types/booking';

interface BookingTableProps {
  bookings: Booking[];
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  onApprove: (bookingId: string, booking: Booking) => void;
  onReject: (bookingId: string, booking: Booking) => void;
  onGenerateMeetLink: (bookingId: string, booking: Booking) => void;
}

export function BookingTable({
  bookings,
  globalFilter,
  onGlobalFilterChange,
  onApprove,
  onReject,
  onGenerateMeetLink,
}: BookingTableProps) {
  const columnHelper = createColumnHelper<Booking>();

  const columns = [
    columnHelper.accessor('userName', {
      header: 'Customer Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userEmail', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('poojaType', {
      header: 'Service',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue() === 'approved'
              ? 'bg-green-100 text-green-800'
              : info.getValue() === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
        </span>
      ),
    }),
    columnHelper.accessor('meetingLink', {
      header: 'Meeting Link',
      cell: (info) => info.getValue() ? (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          View Link
        </a>
      ) : 'Not Generated',
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          {info.row.original.status === 'pending' && (
            <>
              <button
                onClick={() => onApprove(info.getValue(), info.row.original)}
                className="p-1 rounded hover:bg-green-100"
                title="Approve"
              >
                <Check className="h-4 w-4 text-green-600" />
              </button>
              <button
                onClick={() => onReject(info.getValue(), info.row.original)}
                className="p-1 rounded hover:bg-red-100"
                title="Reject"
              >
                <X className="h-4 w-4 text-red-600" />
              </button>
            </>
          )}
          {info.row.original.status === 'approved' && !info.row.original.meetingLink && (
            <button
              onClick={() => onGenerateMeetLink(info.getValue(), info.row.original)}
              className="p-1 rounded hover:bg-blue-100"
              title="Generate Meeting Link"
            >
              <LinkIcon className="h-4 w-4 text-blue-600" />
            </button>
          )}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}