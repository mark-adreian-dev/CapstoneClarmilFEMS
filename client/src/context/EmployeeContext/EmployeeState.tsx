import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { handleError } from '@/utils/errorHandle';
import { EmployeeReducer } from './EmployeeReducer';
import { EmployeeContext, initialEmployeeContextValue } from './EmployeeContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { api } from '@/utils/api';
import { EmployeeCategory, type Employee, type Station } from '@/types/Employee';
import { UserRole, type UserFormType } from '@/types/User';
import { toast } from 'sonner';
import { arrayMove } from '@dnd-kit/sortable';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
interface AddEmployeeResponse {
  message: string,
  user: Employee
}

export const EmployeeState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext)
  const [employeeState, employeeDispatch] = useReducer(EmployeeReducer, initialEmployeeContextValue);
  const emplyoeeFetchedRef = useRef<boolean>(false)
  const location = useLocation()

  const reorderEmployees = useCallback((oldIndex: number, newIndex: number) => {
    employeeDispatch({
      type: "SET_EMPLOYEES",
      payload: arrayMove(employeeState.employees, oldIndex, newIndex)
    });
  }, [employeeState.employees]);

  const isRoleAdmin = useCallback(() => {
    return user?.role === UserRole.ADMIN
  }, [user])

  const onTabChange = useCallback((activeTab: EmployeeCategory | string) => {
    employeeDispatch({type: "SET_ACTIVE_TAB", payload: activeTab as EmployeeCategory})
  }, [])

  const fetchAllEmployeeData = useCallback(async () => {
    if (!isRoleAdmin()) return
    if (emplyoeeFetchedRef.current) return

    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const employeeDataResponse = await api.get("/api/users")
      const employeeData: Employee[] = employeeDataResponse.data
      employeeDispatch({ type: "SET_EMPLOYEES", payload: employeeData.reverse() })

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
      emplyoeeFetchedRef.current = true
    }
  }, [isRoleAdmin])

  const fetchEmployeeData = useCallback(async (employeeID: number): Promise<Employee | undefined> => {
    if (!isRoleAdmin()) return

    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const employeeDataResponse = await api.get(`/api/users/${employeeID}`)
      const employeeData: Employee = employeeDataResponse.data
      return employeeData

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const addEmployee = useCallback(async (employeeDetails: UserFormType) => {
    if (!isRoleAdmin()) return
    const payload = {
      ...employeeDetails,
      birthdate: employeeDetails.birthdate ? format(employeeDetails.birthdate, 'yyyy-MM-dd') : null
    }
    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })

      const response = await api.post(`/api/users`, payload)
      const responseData: AddEmployeeResponse = response.data
      employeeDispatch({
        type: "ADD_EMPLOYEE",
        payload: responseData.user,
      })

      toast.success(responseData.message)
    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const updateEmployee = useCallback(async (employeeDetails: UserFormType, id: number) => {
    if (!isRoleAdmin()) return
    const payload = {
      ...employeeDetails,
      station_id: !employeeDetails.station_id ? null : (employeeDetails.role === UserRole.MANAGER || employeeDetails.role === UserRole.ADMIN) ? null : employeeDetails.station_id ,
      birthdate: employeeDetails.birthdate ? format(employeeDetails.birthdate, 'yyyy-MM-dd') : null
    }

    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.put(`/api/users/${id}`, payload)
      const updatedEmployee: Employee = response.data
      employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee })
      toast.success("Employee updated successfully")

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  },[isRoleAdmin])

  const deleteEmployee = useCallback(async (id: number) => {
    if (!isRoleAdmin()) return
    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      await api.delete(`/api/users/${id}`)
      employeeDispatch({ type: "REMOVE_EMPLOYEE", payload: id })
      toast.success("Employee is successfully removed.")
    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  },[isRoleAdmin])
  
  const deleteBulkEmployee = useCallback(async (ids: number[]) => {
    if (!isRoleAdmin()) return
    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.delete(`/api/users/bulk`, {
        data: { ids: ids }
      })
      employeeDispatch({ type: "REMOVE_EMPLOYEES", payload: ids })
      toast.success(response.data.message)
    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  },[isRoleAdmin])

  const assignEmployees = useCallback(async (employesIDs: number[], stationData: Station) => {
    if (!isRoleAdmin()) return
    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.put(`/api/users/assign`, 
        {
          ids: employesIDs,
          station_id: stationData.id
        }
      )
      
      employeeDispatch({ type: "ASSIGN_EMPLOYEES", payload: { ids: employesIDs, stationData } })
      toast.success(response.data.message)
    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  useEffect(() => {
    onTabChange(EmployeeCategory.ALL)
  }, [location, onTabChange])

  const value = useMemo(() => ({
    ...employeeState,
    fetchAllEmployeeData,
    fetchEmployeeData,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteBulkEmployee,
    reorderEmployees,
    onTabChange,
    emplyoeeFetchedRef,
    assignEmployees,
    employeeDispatch
  }), [
    employeeState,
    fetchAllEmployeeData,
    fetchEmployeeData,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteBulkEmployee,
    reorderEmployees,
    onTabChange,
    emplyoeeFetchedRef,
    assignEmployees,
    employeeDispatch
  ])

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
