/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Employee } from '@/types/Employee';
import type { UserFormType } from '@/types/User';
import { createContext } from 'react';

export interface EmployeeContextType {
  employees: Employee[];
  error: string | null;
  isLoading: boolean;
  fetchAllEmployeeData: () => Promise<void>
  fetchEmployeeData: (employeeID: number) => Promise<Employee | undefined>
  deleteEmployee: (id: number) => Promise<void>
  deleteBulkEmployee: (ids: number[]) => Promise<void>
  addEmployee: (employeeDetails: UserFormType) => Promise<void>
  updateEmployee: (id: number, employeeDetails: UserFormType) => Promise<void>
}

export const initialEmployeeContextValue: EmployeeContextType = {
  employees: [],
  isLoading: false,
  error: null,
  fetchAllEmployeeData: async () => { },
  fetchEmployeeData: async (_employeeID: number) => { return undefined },
  deleteEmployee: async (_id: number) => { },
  deleteBulkEmployee: async (_ids: number[]) => { },
  addEmployee: async (_employeeDetails: UserFormType) => {},
  updateEmployee: async (_id: number, _employeeDetails: UserFormType) => {}
}

export const EmployeeContext = createContext<EmployeeContextType>(initialEmployeeContextValue);
