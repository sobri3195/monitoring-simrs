import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';
import RiskBadge from './RiskBadge';
import { formatDate } from '../utils/formatters';

const FacilityTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Nama Faskes',
        accessorKey: 'namaFaskes',
        cell: ({ row }) => (
          <Link to={`/faskes/${row.original.id}`} className="font-medium text-brand-700 hover:underline">
            {row.original.namaFaskes}
          </Link>
        ),
      },
      { header: 'Tipe', accessorKey: 'tipeFaskes' },
      { header: 'Kotama', accessorKey: 'kotama' },
      { header: 'Vendor', accessorKey: 'vendor' },
      { header: 'Status', accessorKey: 'statusImplementasi', cell: ({ getValue }) => <StatusBadge status={getValue()} /> },
      { header: 'Progress', accessorKey: 'progressPersen', cell: ({ getValue }) => <ProgressBar value={getValue()} /> },
      { header: 'Risiko', accessorKey: 'levelRisiko', cell: ({ getValue }) => <RiskBadge risk={getValue()} /> },
      { header: 'Target Go-Live', accessorKey: 'targetGoLive', cell: ({ getValue }) => formatDate(getValue()) },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-3 py-3 text-left font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100 align-top">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-3">
                  {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilityTable;
