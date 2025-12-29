import type { User, UserContextRole, UserRole } from '@/types/User';
import { createContext } from 'react';

export interface AuthContextType {
  user?: User;
  role?: UserRole;
  isAuthenticated: boolean;

  authError: string | null;
  authLoading: boolean;
  isLoggingIn: boolean;

  loadUser: () => Promise<User | undefined>;

  login: (
    employee_id: string,
    password: string,
    context: UserContextRole
  ) => Promise<void>;

  logout: () => Promise<void>;
}

export const initialAuthContextValue: AuthContextType = {
  isAuthenticated: false,
  authLoading: false,
  authError: null,
  isLoggingIn:  false,
  loadUser: async () => { return undefined },
  login: async () => { },
  logout: async () => { }
} 

export const AuthContext = createContext<AuthContextType>(initialAuthContextValue);
