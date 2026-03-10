interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-1 items-center">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 text-[10px] font-bold uppercase border border-gray-200 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
      >
        Anterior
      </button>
      
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isCurrent = currentPage === page;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[28px] h-7 text-[10px] font-bold border rounded transition-all shadow-sm ${
                isCurrent 
                  ? 'border-[#009cae] bg-[#009cae] text-white shadow-cyan-100' 
                  : 'border-gray-200 bg-white text-gray-400 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 text-[10px] font-bold uppercase border border-gray-200 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
      >
        Próximo
      </button>
    </div>
  );
};