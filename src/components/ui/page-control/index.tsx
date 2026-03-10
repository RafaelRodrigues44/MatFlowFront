import { TableActions } from '../../shared/table-actions';

interface PageControlProps {
  title: string;
  subtitle: string;
  addLabel: string;
  onAddClick: () => void;
}

export const PageControl = ({ title, subtitle, addLabel, onAddClick }: PageControlProps) => {
  return (
    <div className="flex justify-between items-end mb-2">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>

      <TableActions onAddClick={onAddClick} addLabel={addLabel} />
    </div>
  );
};