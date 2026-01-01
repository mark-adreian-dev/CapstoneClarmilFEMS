import React, { useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { handleError } from '@/utils/errorHandle';
import { IngridientReducer } from './IngridientsReducer';
import { IngridientContext, initialIngridientContextValue } from './IngridientsContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import type { Ingridient, IngridientFormType, IngridientsCategory } from '@/types/Ingridients';
import { UserRole } from '@/types/User';
import { format } from 'date-fns';

type AddIngridientResponse = Ingridient


export const IngridientState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext)
  const [ingridientState, ingridientDispatch] = useReducer(IngridientReducer, initialIngridientContextValue);
  const fetchedRef = useRef(false)

  const isRoleAdmin = useCallback(() => {
    return user?.role === UserRole.ADMIN
  }, [user])

  const formatFormRequestBody = useCallback((ingridientDetails: IngridientFormType) => {
    const formData = new FormData();

    Object.entries(ingridientDetails).forEach(([key, value]) => {
      if (key === "expiration_date" && value instanceof Date) {
        formData.append(key, format(value, 'yyyy-MM-dd'));
      }

      else if (key === "image_path") {
        if (value instanceof File) {
          console.log("Valid File detected, appending as 'image'");
          formData.append("image", value); // Backend expects 'image'
        }
      }
      else {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    });

    return formData;
  }, []);

  const onTabChange = useCallback((activeTab: IngridientsCategory | string) => {
    ingridientDispatch({ type: "SET_ACTIVE_TAB", payload: activeTab as IngridientsCategory })
  }, [])

  const fetchAllIngridientsData = useCallback(async () => {
    if (!isRoleAdmin()) return
    if (fetchedRef.current) return

    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })
      const ingridientDataResponse = await api.get("/api/ingridients")
      const ingridientData: Ingridient[] = ingridientDataResponse.data
      ingridientDispatch({ type: "SET_INGRIDIENT", payload: ingridientData.reverse() })

    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
      fetchedRef.current = true
    }
  }, [isRoleAdmin])

  const fetchIngridientsData = useCallback(async (ingridientID: number): Promise<Ingridient | undefined> => {
    if (!isRoleAdmin()) return

    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })
      const ingridientDataResponse = await api.get(`/api/ingridients/${ingridientID}`)
      const ingridientData: Ingridient = ingridientDataResponse.data
      return ingridientData

    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const addIngridient = useCallback(async (ingridientDetails: IngridientFormType) => {
    if (!isRoleAdmin()) return
    const payload = formatFormRequestBody(ingridientDetails)
  
    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })

      const response = await api.post(`/api/ingridients`, payload, {
        headers: {
          "Content-Type" : undefined
        }
      })
      const responseData: AddIngridientResponse = response.data

      ingridientDispatch({
        type: "ADD_INGRIDIENT",
        payload: responseData,
      })

      toast.success("New Ingridient Added")
    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [formatFormRequestBody, isRoleAdmin])

  const updateIngridient = useCallback(async (id: number, ingridientDetails: IngridientFormType) => {
    if (!isRoleAdmin()) return
 
    const payload = formatFormRequestBody(ingridientDetails)
    
    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.put(`/api/ingridients/${id}`, payload, {
        headers: {
          "Content-Type": undefined
        }
      })
      const updatedIngridient: Ingridient = response.data
      ingridientDispatch({ type: "UPDATE_INGRIDIENT", payload: updatedIngridient })
      toast.success("Ingridient updated successfully")

    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [formatFormRequestBody, isRoleAdmin])

  const deleteIngridient = useCallback(async (id: number) => {
    if (!isRoleAdmin()) return
    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })
      await api.delete(`/api/ingridients/${id}`)
      ingridientDispatch({ type: "REMOVE_INGRIDIENT", payload: id })
      toast.success("Ingridient is successfully removed.")
    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const deleteBulkIngridients = useCallback(async (ids: number[]) => {
    if (!isRoleAdmin()) return
    try {
      ingridientDispatch({ type: "SET_LOADING", payload: true })
      const response = await api.delete(`/api/ingridients/bulk`, {
        data: { ids: ids }
      })
      ingridientDispatch({ type: "REMOVE_INGRIDIENTS", payload: ids })
      toast.success(response.data.message)
    } catch (error) {
      handleError(error)
    } finally {
      ingridientDispatch({ type: "SET_LOADING", payload: false })
    }
  }, [isRoleAdmin])

  const value = useMemo(() => ({
    ...ingridientState,
    fetchAllIngridientsData,
    fetchIngridientsData,
    addIngridient,
    updateIngridient,
    deleteIngridient,
    deleteBulkIngridients,
    onTabChange
  }), [
    ingridientState,
    fetchAllIngridientsData,
    fetchIngridientsData,
    addIngridient,
    updateIngridient,
    deleteIngridient,
    deleteBulkIngridients,
    onTabChange
  ])

  return (
    <IngridientContext.Provider value={value}>
      {children}
    </IngridientContext.Provider>
  );
};
