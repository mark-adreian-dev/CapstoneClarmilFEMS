import React, { useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { handleError } from '@/utils/errorHandle';
import { StationReducer } from './StationReducer';
import { StationContext, initialStationContextValue } from './StationContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import { UserRole } from '@/types/User';
import type { Station, StationFormType, StationsCategory } from '@/types/Station';
import { EmployeeContext } from '../EmployeeContext/EmployeeContext';
import { IngridientContext } from '../IngridientsContext/IngridientsContext';
import type { Employee } from '@/types/Employee';

type AddStationResponse = Station


export const StationState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext)
  const { updateEmployee, employees, employeeDispatch } = useContext(EmployeeContext)
  const { emplyoeeFetchedRef, fetchAllEmployeeData } = useContext(EmployeeContext)
  const { ingridientsFetchedRef, fetchAllIngridientsData } = useContext(IngridientContext)
  
  const [stationState, stationDispatch] = useReducer(StationReducer, initialStationContextValue);
  const stationFetchedRef = useRef(false)

  const isRoleAdmin = useCallback(() => {
    return user?.role === UserRole.ADMIN
  }, [user])

  const onTabChange = useCallback((activeTab: StationsCategory | string) => {
    stationDispatch({ type: "SET_ACTIVE_TAB", payload: activeTab as StationsCategory })
  }, [])

  const fetchAllStationsData = useCallback(async () => {
    if (!isRoleAdmin()) return
    if (stationFetchedRef.current) return
    if (!emplyoeeFetchedRef.current) fetchAllEmployeeData()
    if (!ingridientsFetchedRef.current) fetchAllIngridientsData()

    try {
      stationDispatch({ type: "SET_LOADING", payload: true })
      const stationDataResponse = await api.get("/api/stations")
      const stationData: Station[] = stationDataResponse.data
      stationDispatch({ type: "SET_STATION", payload: stationData.reverse() })

    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
      stationFetchedRef.current = true
    }
  }, [emplyoeeFetchedRef, fetchAllEmployeeData, fetchAllIngridientsData, ingridientsFetchedRef, isRoleAdmin])

  const fetchStationsData = useCallback(async (stationID: number): Promise<Station | undefined> => {
    if (!isRoleAdmin()) return

    try {
      stationDispatch({ type: "SET_LOADING", payload: true })
      const stationDataResponse = await api.get(`/api/stations/${stationID}`)
      const stationData: Station = stationDataResponse.data
      return stationData

    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const addStation = useCallback(async (stationDetails: StationFormType) => {
    if (!isRoleAdmin()) return

    try {
      stationDispatch({ type: "SET_LOADING", payload: true })

      const response = await api.post(`/api/stations`, stationDetails)
      const responseData: AddStationResponse = response.data

      stationDispatch({
        type: "ADD_STATION",
        payload: responseData,
      })

      toast.success("New Station Added")
    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const updateStation = useCallback(async (id: number, stationDetails: StationFormType) => {
    if (!isRoleAdmin()) return
 
    try {
      stationDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.put(`/api/stations/${id}`, stationDetails)
      const updatedStation: Station = response.data
      stationDispatch({ type: "UPDATE_STATION", payload: updatedStation })
      toast.success("Station updated successfully")

    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const deleteStation = useCallback(async (stationID: number, employeesAssigned: Employee[]) => {
    if (!isRoleAdmin()) return

    employeesAssigned.map(employee => {
      const updatedEmployee: Employee = {
        ...employee,
        station_id: null,
        assigned_station: null
      }
      employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee })
    })

    try {
      stationDispatch({ type: "SET_LOADING", payload: true })
      await api.delete(`/api/stations/${stationID}`)
      stationDispatch({ type: "REMOVE_STATION", payload: stationID })
      toast.success("Station is successfully removed.")
    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [employeeDispatch, isRoleAdmin])

  const deleteBulkStations = useCallback(async (ids: number[]) => {
    if (!isRoleAdmin()) return
    try {
      stationDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.delete(`/api/stations/bulk`, {
        data: { ids: ids }
      })
      stationDispatch({ type: "REMOVE_STATIONS", payload: ids })
      toast.success(response.data.message)
    } catch (error) {
      handleError(error)
    } finally {
      stationDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const assignManager = useCallback(async (employeeID: number, stationID: number) => {

    const employeeData = employees.find(employee => employee.id === employeeID)
    const stationData = stationState.stations.find(station => station.id === stationID)

    if (employeeData && stationData) {
      if (employeeData.role === UserRole.MANAGER) {
        const payload = {
          ...employeeData,
          station_id: null,
          birthdate: employeeData.birthdate ? new Date(employeeData.birthdate) : null
        }
        await updateEmployee(payload, employeeID)
        employeeDispatch({ type: "ASSIGN_MANAGER", payload: { id: employeeID, stationData } })
        stationDispatch({ type: "ASSIGN_MANAGER", payload: { id: stationData.id, employeeID: employeeData.id } })
      }
    }    
  }, [employeeDispatch, employees, stationState.stations, updateEmployee])

  const unAssignManager = useCallback(async (employeeID: number, stationID: number) => {
    const employeeData = employees.find(employee => employee.id === employeeID)
    const stationData = stationState.stations.find(station => station.id === stationID)

    if (employeeData && stationData) {
      if (employeeData.role === UserRole.MANAGER) {
        const payload: StationFormType = {
          ...stationData,
          manager_id: null
        }
        await updateStation(stationData.id, payload)
        employeeDispatch({ type: "UNASSIGN_MANAGER", payload: { id: employeeID, stationID: stationData.id } })
        stationDispatch({ type: "UNASSIGN_MANAGER", payload: { id: stationData.id } })
      }
    }    
  }, [employeeDispatch, employees, stationState.stations, updateStation])

  const value = useMemo(() => ({
    ...stationState,
    fetchAllStationsData,
    fetchStationsData,
    addStation,
    updateStation,
    deleteStation,
    deleteBulkStations,
    onTabChange,
    assignManager,
    unAssignManager,
  }), [
    stationState,
    fetchAllStationsData,
    fetchStationsData,
    addStation,
    updateStation,
    deleteStation,
    deleteBulkStations,
    onTabChange,
    assignManager,
    unAssignManager,
  ])

  return (
    <StationContext.Provider value={value}>
      {children}
    </StationContext.Provider>
  );
};
