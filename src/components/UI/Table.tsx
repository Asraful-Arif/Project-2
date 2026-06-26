import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import Pagination from "./Pagination";
interface TableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

const Table = <TData,>({ columns, data }: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className=" w-full table-fixed border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headersGroup) => (
              <tr key={headersGroup.id}>
                {headersGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-white  cursor-pointer"
                  >
                    <div>
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <span>
                        {header.column.getIsSorted() === "asc" && (
                          <ChevronUp size={18} />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm border-b border-slate-200 dark:border-slate-700"
                      style={{ width: cell.column.getSize() }}
                    >
                      <div>
                        <span>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-center text-sm text-gray-500"
                >
                  No data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="px-6 py-3">
          <Pagination table={table} dataLength={data.length} />
        </div>
      </div>
    </div>
  );
};

export default Table;
