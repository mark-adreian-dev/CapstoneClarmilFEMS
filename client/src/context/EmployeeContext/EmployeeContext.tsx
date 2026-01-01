/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmployeeCategory, type Employee } from '@/types/Employee';
import type { UserFormType } from '@/types/User';
import { createContext } from 'react';

export interface EmployeeContextType {
  employees: Employee[];
  error: string | null;
  isLoading: boolean;
  activeTab: EmployeeCategory
  fetchAllEmployeeData: () => Promise<void>
  fetchEmployeeData: (employeeID: number) => Promise<Employee | undefined>
  deleteEmployee: (id: number) => Promise<void>
  deleteBulkEmployee: (ids: number[]) => Promise<void>
  addEmployee: (employeeDetails: UserFormType) => Promise<void>
  updateEmployee: (employeeDetails: UserFormType, id: number) => Promise<void>
  reorderEmployees: (oldIndex: number, newIndex: number) => void
  onTabChange: (activeTab: EmployeeCategory | string) => void 
}

export const initialEmployeeContextValue: EmployeeContextType = {
  employees: [],
  isLoading: false,
  error: null,
  activeTab: EmployeeCategory.ALL,
  fetchAllEmployeeData: async () => { },
  fetchEmployeeData: async (_employeeID: number) => { return undefined },
  deleteEmployee: async (_id: number) => { },
  deleteBulkEmployee: async (_ids: number[]) => { },
  addEmployee: async (_employeeDetails: UserFormType) => {},
  updateEmployee: async (_employeeDetails: UserFormType, _id: number) => { },
  reorderEmployees: (_oldIndex: number, _newIndex: number) => { },
  onTabChange: (_activeTab: EmployeeCategory | string) => {}
}

export const EmployeeContext = createContext<EmployeeContextType>(initialEmployeeContextValue);
