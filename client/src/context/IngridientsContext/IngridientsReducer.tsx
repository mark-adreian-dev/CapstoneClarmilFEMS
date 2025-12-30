import type { Employee } from "@/types/Employee";
import type { EmployeeContextType } from "./IngridientsContext";

export type EmployeeAction =
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'AUTH_STATUS_RESET' }

  | { type: 'SET_EMPLOYEES', payload: Employee[] }
  | { type: 'ADD_EMPLOYEE', payload: Employee }
  | { type: 'UPDATE_EMPLOYEE', payload: Employee }
  | { type: 'REMOVE_EMPLOYEE', payload: number }
  | { type: 'REMOVE_EMPLOYEES', payload: number[] }

export const EmployeeReducer = (state: EmployeeContextType, action: EmployeeAction): EmployeeContextType => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      }
    case "AUTH_STATUS_RESET":
      return {
        ...state,
        error: null,
        isLoading: false
      }
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload
      }
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      }
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map(employee => employee.id === action.payload.id ? action.payload : employee)
      }
    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(employees => employees.id !== action.payload)
      }
    case "REMOVE_EMPLOYEES": {
      const updatedEmployeeList = state.employees.filter(
        (employee) => !action.payload.includes(employee.id)
      );
      return {
        ...state,
        employees: updatedEmployeeList
      };
    }
     
    default:
      return state;
  }
};
