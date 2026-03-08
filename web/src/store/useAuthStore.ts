import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  role: string;
  roleLabel?: string;
  id?: number; 
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {

        localStorage.setItem('@MaltFlow:token', token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('@MaltFlow:token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: '@MaltFlow:auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);