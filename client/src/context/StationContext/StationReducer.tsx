import type { StationsCategory, Station } from "@/types/Station";
import type { StationsContextType } from "./StationContext";


export type StationsAction =
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'SET_ACTIVE_TAB', payload: StationsCategory }
  | { type: 'AUTH_STATUS_RESET' }

  | { type: 'SET_STATION', payload: Station[] }
  | { type: 'ADD_STATION', payload: Station }
  | { type: 'ASSIGN_MANAGER', payload: { id: number, employeeID: number} }
  | { type: 'UNASSIGN_MANAGER', payload: { id: number } }
  | { type: 'UPDATE_STATION', payload: Station }
  | { type: 'REMOVE_STATION', payload: number }
  | { type: 'REMOVE_STATIONS', payload: number[] }
  
export const StationReducer = (state: StationsContextType, action: StationsAction): StationsContextType => {
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
    case "SET_STATION":
      return {
        ...state,
        stations: action.payload
      }
    case "ADD_STATION":
      return {
        ...state,
        stations: [action.payload, ...state.stations]
      }
    case "ASSIGN_MANAGER": {
      const { id, employeeID } = action.payload;

      const updatedStationsList = state.stations.map((station) => {
        if (station.id === id) {
          return {
            ...station,       
            manager_id: employeeID,
          };
        }
        return station;
      });

      return {
        ...state,
        stations: updatedStationsList,
      };
    }
    case "UNASSIGN_MANAGER": {
      const { id } = action.payload;

      const updatedStationsList = state.stations.map((station) => {
        if (station.id === id) {
          return {
            ...station,
            manager_id: null,
          };
        }
        return station;
      });

      return {
        ...state,
        stations: updatedStationsList,
      };
    }
      
    case "UPDATE_STATION":
      return {
        ...state,
        stations: state.stations.map(station => station.id === action.payload.id ? action.payload : station)
      }
    case "REMOVE_STATION":
      return {
        ...state,
        stations: state.stations.filter(station => station.id !== action.payload)
      }
    case "REMOVE_STATIONS": {
      const updatedStationsList = state.stations.filter(
        (station) => !action.payload.includes(station.id)
      );
      return {
        ...state,
        stations: updatedStationsList
      };
    }
   
    default:
      return state;
  }
};
