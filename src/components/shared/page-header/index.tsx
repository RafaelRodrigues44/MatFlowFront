interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-light text-gray-800 tracking-tighter">{title}</h2>
      <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">{subtitle}</p>
    </div>
  );
};