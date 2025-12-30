import React, { useContext, useReducer } from 'react';
import { handleError } from '@/utils/errorHandle';
import { EmployeeReducer } from './StationReducer';
import { EmployeeContext, initialEmployeeContextValue } from './IngridientsContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { api } from '@/utils/api';
import type { Employee } from '@/types/Employee';
import { UserRole, type UserFormType } from '@/types/User';
import { toast } from 'sonner';

interface AddEmployeeResponse {
  message: string,
  user: Employee
}

export const EmployeeState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext)
  const [employeeState, employeeDispatch] = useReducer(EmployeeReducer, initialEmployeeContextValue);
  
  const isRoleAdmin = () => {
    if (!user) return false
    if (user.role !== UserRole.ADMIN) return false
    return true
  }

  const fetchAllEmployeeData = async () => {
    if (!isRoleAdmin()) return
    
    try {
      employeeDispatch({ type: "SET_LOADING", payload: true})
      const employeeDataResponse = await api.get("/api/users")
      const employeeData: Employee[] = employeeDataResponse.data
      employeeDispatch({ type: "SET_EMPLOYEES", payload: employeeData.reverse() })

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  } 

  const fetchEmployeeData = async (employeeID: number): Promise<Employee | undefined>  => {
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
  } 

  const addEmployee = async (employeeDetails: UserFormType) => {
    if (!isRoleAdmin()) return

    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.post(`/api/users`, employeeDetails)
      const responseData: AddEmployeeResponse = response.data
      employeeDispatch({ type: "ADD_EMPLOYEE", payload: responseData.user })
      toast.success(responseData.message)

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateEmployee = async (id: number, employeeDetails: UserFormType) => {
    if (!isRoleAdmin()) return

    try {
      employeeDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.put(`/api/users/${id}`, employeeDetails)
      const updatedEmployee: Employee = response.data
      employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee })
      toast.success("Employee updated successfully")

    } catch (error) {
      handleError(error)
    } finally {
      employeeDispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const deleteEmployee = async (id: number) => {
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
  }
  
  const deleteBulkEmployee = async (ids: number[]) => {
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
  }

  return (
    <EmployeeContext.Provider
      value={{
        ...employeeState,
        fetchAllEmployeeData,
        fetchEmployeeData,
        deleteEmployee,
        deleteBulkEmployee,
        addEmployee,
        updateEmployee
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
