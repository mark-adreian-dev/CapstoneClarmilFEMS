import type { IngridientsContextType } from "./IngridientsContext";
import type { Ingridient, IngridientsCategory } from "@/types/Ingridient";


export type IngridientsAction =
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'SET_ACTIVE_TAB', payload: IngridientsCategory }
  | { type: 'AUTH_STATUS_RESET' }

  | { type: 'SET_INGRIDIENT', payload: Ingridient[] }
  | { type: 'ADD_INGRIDIENT', payload: Ingridient }
  | { type: 'UPDATE_INGRIDIENT', payload: Ingridient }
  | { type: 'REMOVE_INGRIDIENT', payload: number }
  | { type: 'REMOVE_INGRIDIENTS', payload: number[] }

export const IngridientReducer = (state: IngridientsContextType, action: IngridientsAction): IngridientsContextType => {
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
    case "SET_INGRIDIENT":
      return {
        ...state,
        ingridients: action.payload
      }
    case "ADD_INGRIDIENT":
      return {
        ...state,
        ingridients: [action.payload, ...state.ingridients]
      }
    case "UPDATE_INGRIDIENT":
      return {
        ...state,
        ingridients: state.ingridients.map(ingridient => ingridient.id === action.payload.id ? action.payload : ingridient)
      }
    case "REMOVE_INGRIDIENT":
      return {
        ...state,
        ingridients: state.ingridients.filter(ingridient => ingridient.id !== action.payload)
      }
    case "REMOVE_INGRIDIENTS": {
      const updatedIngridientsList = state.ingridients.filter(
        (ingridient) => !action.payload.includes(ingridient.id)
      );
      return {
        ...state,
        ingridients: updatedIngridientsList
      };
    }
     
    default:
      return state;
  }
};
