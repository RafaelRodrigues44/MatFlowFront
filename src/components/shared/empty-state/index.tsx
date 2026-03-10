import { Database } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Database size={32} className="text-gray-300" />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider">{message}</span>
    </div>
  );
};