import type { User, UserRole } from "@/types/User";
import type { AuthContextType } from "./AuthContext";

export type AuthAction =
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'AUTH_STATUS_RESET' }

  | { type: 'LOGIN_SUCCESS'; payload: UserRole }
  | { type: 'LOAD_USER'; payload: User }
  | { type: 'SET_LOGGING_IN'; payload: boolean }
  | { type: 'LOGOUT' }


export const AuthReducer = (state: AuthContextType, action: AuthAction): AuthContextType => {
  switch (action.type) {
    case "SET_LOADING": 
      return {
        ...state,
        authLoading: action.payload
      }
    case "SET_ERROR":
      return {
        ...state,
        authError: action.payload
      }
    case "AUTH_STATUS_RESET": 
      return {
        ...state,
        authError: null,
        authLoading: false
      }
    case "SET_LOGGING_IN":
      return {
        ...state,
        isLoggingIn: action.payload
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        role: action.payload
      }
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        authLoading: false,
        user: undefined,
        role: undefined,
      };

    default:
      return state;
  }
};
