import React, { useEffect, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';
import { AuthContext, initialAuthContextValue } from './AuthContext';
import { api } from '@/utils/api';
import { UserRole, type User, type UserContextRole } from '@/types/User';
import type { AuthSuccess } from '@/types/AuthResponse';
import { handleError } from '@/utils/errorHandle';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie } from '@/utils/cookies';


export const AuthState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthContextValue);
  const navigate = useNavigate()

  useEffect(() => {
    const reload = async () => {
      const xsrf = getCookie("XSRF-TOKEN")
  
      if (xsrf) { 
        try {
          authDispatch({ type: "SET_LOADING", payload: true })
          authDispatch({ type: "SET_LOGGING_IN", payload: true })
          const userData = await loadUser();

          if (userData) {
            authDispatch({
              type: 'LOGIN_SUCCESS',
              payload: userData.role,
            });
            handleAuthRedirect(userData.role)
          }

        } catch (error) {
          handleError(error)
        } finally {
          authDispatch({ type: "SET_LOADING", payload: false })
          authDispatch({ type: "SET_LOGGING_IN", payload: false })
        }
      }
    }
    reload()
  
  }, [])

  const handleAuthRedirect = (role: UserRole) => {
    const redirectPaths: Record<UserRole, string> = {
      [UserRole.MEASURING]: "/worker",
      [UserRole.RECIEVER]: "/worker/reciever",
      [UserRole.MANAGER]: "/manager",
      [UserRole.ADMIN]: "/admin",
    }

    navigate(redirectPaths[role])
   }

  const handleLogoutRedirect = (role: UserRole) => {
    const loginPaths: Record<UserRole, string> = {
      [UserRole.MEASURING]: "/login/worker",
      [UserRole.RECIEVER]: "/login/worker",
      [UserRole.MANAGER]: "/login/manager",
      [UserRole.ADMIN]: "/login/admin",
    }

    navigate(loginPaths[role])
  }

  // 🔹 Load authenticated user
  const loadUser = async () => {
    try {
      authDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.get('/api/user');
      const userData: User = response.data.user
      authDispatch({
        type: 'LOAD_USER',
        payload: userData,
      });

      return userData;
    } catch (error) {
      handleError(error)
    } finally {
      authDispatch({ type: "SET_LOADING", payload: false })
    }
  };

  // 🔹 Login (context-based)
  const login = async (
    employee_id: string,
    password: string,
    context: UserContextRole
  ) => {
    try {
      authDispatch({ type: "SET_LOADING", payload: true })
      authDispatch({ type: "SET_LOGGING_IN", payload: true })
      await api.get('/sanctum/csrf-cookie');

      const loginResponse = await api.post('/api/login', {
        employee_id,
        password,
        context,
      });

      const loginResponseData: AuthSuccess = loginResponse.data
      authDispatch({
        type: 'LOGIN_SUCCESS',
        payload: loginResponseData.role,
      });

      const userData: User | undefined = await loadUser();
      if(userData) handleAuthRedirect(userData.role)
    } catch (error) {
      handleError(error)
      deleteCookie("XSRF-TOKEN")
    } finally {
      authDispatch({ type: "SET_LOADING", payload: false })
      authDispatch({ type: "SET_LOGGING_IN", payload: false })
    }
  };

  // 🔹 Logout
  const logout = async () => {
    authDispatch({ type: "SET_LOADING", payload: true })
    try {
      if (authState.role) {
        const userRole: UserRole = authState.role
        await api.post('/api/logout');
        authDispatch({ type: 'LOGOUT' });
        deleteCookie("XSRF-TOKEN")
        handleLogoutRedirect(userRole)
      }
    } catch (error) {
        handleError(error)
    } finally {
      authDispatch({ type: "SET_LOADING", payload: false })
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loadUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
