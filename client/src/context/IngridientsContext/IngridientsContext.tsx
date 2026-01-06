/* eslint-disable @typescript-eslint/no-unused-vars */
import { IngridientsCategory, type Ingridient, type IngridientFormType } from '@/types/Ingridient';
import { createContext, type RefObject } from 'react';

export interface IngridientsContextType {
  ingridients: Ingridient[];
  error: string | null;
  isLoading: boolean;
  activeTab: IngridientsCategory
  fetchAllIngridientsData: () => Promise<void>
  fetchIngridientData: (ingridientID: number) => Promise<Ingridient | undefined>
  deleteIngridient: (id: number) => Promise<void>
  deleteBulkIngridient: (ids: number[]) => Promise<void>
  addIngridient: (ingridientDetails: IngridientFormType) => Promise<void>
  updateIngridient: (id: number, ingridientDetails: IngridientFormType) => Promise<void>
  onTabChange: (activeTab: IngridientsCategory | string) => void
  ingridientsFetchedRef: RefObject<boolean>
}

export const initialIngridientContextValue: IngridientsContextType = {
  ingridients: [],
  isLoading: false,
  error: null,
  activeTab: IngridientsCategory.ALL,
  fetchAllIngridientsData: async () => { },
  fetchIngridientData: async (_ingridientID: number) => { return undefined },
  deleteIngridient: async (_id: number) => { },
  deleteBulkIngridient: async (_ids: number[]) => { },
  addIngridient: async (_ingridientDetails: IngridientFormType) => { },
  updateIngridient: async (_id: number, _ingridientDetails: IngridientFormType) => { },
  onTabChange: (_activeTab: IngridientsCategory | string) => { },
  ingridientsFetchedRef: { current: false }
}

export const IngridientContext = createContext<IngridientsContextType>(initialIngridientContextValue);
