import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
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

          if (userData && userData.role) {
            authDispatch({
              type: 'LOGIN_SUCCESS',
              payload: userData.role,
            });
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
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAuthRedirect = useCallback((role: UserRole) => {
    const redirectPaths: Record<UserRole, string> = {
      [UserRole.MEASURING]: "/worker",
      [UserRole.RECIEVER]: "/worker/reciever",
      [UserRole.MANAGER]: "/manager",
      [UserRole.ADMIN]: "/admin",
    }

    navigate(redirectPaths[role])
  }, [navigate])

  const handleLogoutRedirect = useCallback((role: UserRole) => {
    const loginPaths: Record<UserRole, string> = {
      [UserRole.MEASURING]: "/login/worker",
      [UserRole.RECIEVER]: "/login/worker",
      [UserRole.MANAGER]: "/login/manager",
      [UserRole.ADMIN]: "/login/admin",
    }

    navigate(loginPaths[role])
  }, [navigate])

  // 🔹 Load authenticated user
  const loadUser = useCallback(async () => {
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
  }, [])

  // 🔹 Login (context-based)
  const login = useCallback(async (
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
      if (userData && userData.role) handleAuthRedirect(userData.role)
    } catch (error) {
      handleError(error)
      deleteCookie("XSRF-TOKEN")
    } finally {
      authDispatch({ type: "SET_LOADING", payload: false })
      authDispatch({ type: "SET_LOGGING_IN", payload: false })
    }
  }, [handleAuthRedirect, loadUser])

  // 🔹 Logout
  const logout = useCallback(async () => {
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
  }, [authState.role, handleLogoutRedirect])

  const value = useMemo(() => ({
    ...authState,
    loadUser,
    login,
    logout,
  }), [
    authState,
    loadUser,
    login,
    logout
  ])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
