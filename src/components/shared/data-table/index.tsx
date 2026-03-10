import { type ReactNode } from 'react';
import { EmptyState } from '../empty-state';

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => ReactNode;
  footerLabel: string;
  emptyMessage: string;
  totalRecords?: number; // <--- ADICIONE ESTA LINHA AQUI
}

export function DataTable<T>({
  headers,
  data,
  renderRow,
  footerLabel,
  emptyMessage,
  totalRecords // <--- ADICIONE AQUI TAMBÉM
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 border-b border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {data.length > 0 ? (
              data.map((item) => renderRow(item))
            ) : (
              <tr>
                <td colSpan={headers.length}>
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
          {footerLabel}: {data.length} {totalRecords !== undefined && `de ${totalRecords}`}
        </span>
      </div>
    </div>
  );
}