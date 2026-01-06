/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Employee } from '@/types/Employee';
import { StationsCategory, type Station, type StationFormType } from '@/types/Station';
import { createContext } from 'react';

export interface StationsContextType {
  stations: Station[];
  error: string | null;
  isLoading: boolean;
  activeTab: StationsCategory
  fetchAllStationsData: () => Promise<void>
  fetchStationData: (stationID: number) => Promise<Station | undefined>
  deleteStation: (stationID: number, employeesAssigned: Employee[]) => Promise<void>
  deleteBulkStation: (ids: number[]) => Promise<void>
  addStation: (stationDetails: StationFormType) => Promise<void>
  updateStation: (id: number, stationDetails: StationFormType) => Promise<void>
  onTabChange: (activeTab: StationsCategory | string) => void
  assignManager: (employeeID: number, stationID: number) => Promise<void>
  unAssignManager: (employeeID: number, stationID: number) => Promise<void>
}

export const initialStationContextValue: StationsContextType = {
  stations: [],
  isLoading: false,
  error: null,
  activeTab: StationsCategory.ALL,
  fetchAllStationsData: async () => { },
  fetchStationData: async (_stationID: number) => { return undefined },
  deleteStation: async (_stationID: number, _employeesAssigned: Employee[]) => { },
  deleteBulkStation: async (_ids: number[]) => { },
  addStation: async (_stationDetails: StationFormType) => { },
  updateStation: async (_id: number, _stationDetails: StationFormType) => { },
  onTabChange: (_activeTab: StationsCategory | string) => { },
  assignManager: async (_employeeID: number, _stationID: number) => {},
  unAssignManager: async (_employeeID: number, _stationID: number) => {},
}

export const StationContext = createContext<StationsContextType>(initialStationContextValue);
