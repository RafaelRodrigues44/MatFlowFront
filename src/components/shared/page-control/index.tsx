import { PageHeader } from '../page-header';
import { TableActions } from '../table-actions';

interface PageControlProps {
  title: string;
  subtitle: string;
  addLabel: string;
  onAddClick: () => void;
}

export const PageControl = ({ title, subtitle, addLabel, onAddClick }: PageControlProps) => {
  return (
    <div className="flex justify-between items-end mb-2">
      <PageHeader title={title} subtitle={subtitle} />
      <TableActions onAddClick={onAddClick} addLabel={addLabel} />
    </div>
  );
};