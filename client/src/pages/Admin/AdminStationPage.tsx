import HeaderControls from "@/components/pages/Admin/StationManagement/HeaderControls";
import StationTabContent from "@/components/pages/Admin/StationManagement/StationTabContent";
import { StationContext } from "@/context/StationContext/StationContext";
import { StationsCategory } from "@/types/Station";
import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";


export interface StationPageContextValues {
  query: string
  activeTab: StationsCategory,
  setQuery: Dispatch<SetStateAction<string>>
  setActiveTab: Dispatch<SetStateAction<StationsCategory>>
}

const StationPageContextInitialValues: StationPageContextValues = {
  query: "",
  activeTab: StationsCategory.ALL,
  setQuery: () => {},
  setActiveTab: () => {},
}

// eslint-disable-next-line react-refresh/only-export-components
export const StationPageContext = createContext<StationPageContextValues>(StationPageContextInitialValues)

export function AdminStationPage() {
  const { stations, fetchAllStationsData } = useContext(StationContext)
  const [query, setQuery] = useState<string>("")
  const [activeTab, setActiveTab] = useState<StationsCategory>(StationsCategory.ALL)

  useEffect(() => {
    fetchAllStationsData()
  }, [fetchAllStationsData])

  const value = useMemo(() => ({
    query,
    activeTab, 
  
    setQuery,
    setActiveTab
  }), [activeTab, query]);
  

  return (
    <StationPageContext.Provider value={value}>
      <div>
        <h1 className="text-6xl font-black  mb-8 px-4" >Station Management</h1>
        <HeaderControls >
          <div className="mt-5">
            <StationTabContent stationsData={stations} query={query} value={StationsCategory.ALL} />
            <StationTabContent stationsData={stations} query={query} value={StationsCategory.PREPARATION} />
            <StationTabContent stationsData={stations} query={query} value={StationsCategory.PROCESSING} />
          </div>
        
        </HeaderControls>
      </div>
    </StationPageContext.Provider>
  )
}
