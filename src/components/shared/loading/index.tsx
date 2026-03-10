export const Loading = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-100 border-t-cyan-600"></div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 animate-pulse">
          Sincronizando Base Sorocaba...
        </span>
      </div>
    </div>
  );
};