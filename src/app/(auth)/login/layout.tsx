import { type ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-700">
      {children}
    </div>
  );
}