import type { Employee, EmployeeCategory, Station } from "@/types/Employee";
import type { EmployeeContextType } from "./EmployeeContext";
import { UserRole } from "@/types/User";


export type EmployeeAction =
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'SET_ACTIVE_TAB', payload: EmployeeCategory }
  | { type: 'AUTH_STATUS_RESET' }

  | { type: 'SET_EMPLOYEES', payload: Employee[] }
  | { type: 'ADD_EMPLOYEE', payload: Employee }
  | { type: 'ASSIGN_EMPLOYEES', payload: { ids: number[], stationData: Station | undefined}}
  | { type: 'ASSIGN_MANAGER', payload: { id: number, stationData: Station}}
  | { type: 'UNASSIGN_MANAGER', payload: { id: number, stationID: number}}
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
    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.payload
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
    case "ASSIGN_EMPLOYEES": {
      const { ids, stationData } = action.payload;
    
      const updatedEmployeeList = state.employees.map((employee) => {
        // Check if the current employee's ID is in the list of updated IDs
        if (ids.includes(employee.id)) {
          if (stationData) {
            return {
              ...employee,
              station_id: stationData.id,
              assigned_station: stationData ?? null
            };
          }
        }
        // If not, return the employee as is
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployeeList,
      };
    } 
    case "ASSIGN_MANAGER": {
      const { id, stationData } = action.payload;

      const updatedEmployeeList = state.employees.map((employee) => {
        // Check if the current employee's ID is in the list of updated IDs
        if (employee.role === UserRole.MANAGER) {
          if (employee.id === id) {
            return {
              ...employee,
              station_id: null,
              managed_stations: [...employee.managed_stations, stationData],
              assigned_station: null
            };
          }
        }
        // If not, return the employee as is
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployeeList,
      };
    }
    case "UNASSIGN_MANAGER": {
      const { id, stationID } = action.payload;

      const updatedEmployeeList = state.employees.map((employee) => {
        // Check if the current employee's ID is in the list of updated IDs
        if (employee.role === UserRole.MANAGER) {
          if (employee.id === id) {
            return {
              ...employee,
              station_id: null,
              managed_stations: employee.managed_stations.filter(station => station.id !== stationID),
              assigned_station: null
            };
            
          }
        }
        // If not, return the employee as is
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployeeList,
      };
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
