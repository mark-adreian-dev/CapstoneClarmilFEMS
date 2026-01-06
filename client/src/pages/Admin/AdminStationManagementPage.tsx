import { DataTable } from "@/components/data-table"
import { stationEmployeeColumn } from "@/components/data-table-components/Columns/StationEmployeesColumn"
import { BreadcrumbNavigation } from "@/components/global/BreadcrumbNavigation"
import ManagerProfile from "@/components/pages/Admin/StationManagement/StationManagement/MangerProfile"
import StationUserActionButton from "@/components/pages/Admin/StationManagement/StationManagement/StationUserActionButton"
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext"
import { StationContext } from "@/context/StationContext/StationContext"
import { StationEmployeeCategory, StationType } from "@/types/Station"
import { UserRole } from "@/types/User"

import { useCallback, useContext, useMemo } from "react"
import { Navigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export default function AdminStationManagementPage() {
  const { id } = useParams() 
  const { stations } = useContext(StationContext)
  const { employees, activeTab, onTabChange } = useContext(EmployeeContext)

  
  const redirectIfStationNotFound = useCallback(() => {
    toast.error("There's problem loading the data")
    return <Navigate to={"/admin/stations"} />
  }, [])
  
  const stationData = useMemo(() => {
    const stationData = stations.find(station => station.id === Number(id))
    if (!stationData) {
      redirectIfStationNotFound()
      return
    }

    return stationData
  }, [id, redirectIfStationNotFound, stations])
  
  const stationManagerData = useMemo(() => {
    if (!stationData) {
      redirectIfStationNotFound()
      return
    }
    const managerData = employees.find(employee => employee.id === stationData.manager_id)
    return managerData
  
  }, [employees, redirectIfStationNotFound, stationData])

  const filteredEmployeeList = useMemo(() => {
    if (!stationData) return 
    
    const targetRole = stationData.type === StationType.PREPARATION
      ? UserRole.MEASURING
      : UserRole.RECIEVER;

    return employees.filter(employee =>
      employee.role === targetRole &&
      employee.station_id === stationData.id
    );
  }, [employees, stationData]);

  if (!stationData) {
    redirectIfStationNotFound()
    return
  }
  return (
    <div >
      <div className="px-4 mb-4">
        <h1 className="text-6xl font-black  mb-8 " >{stationData.name}</h1>
        <BreadcrumbNavigation homePath={"/admin/stations"} homePathLabel={"Stations"} currentPageLabel={stationData.name} />
        <div className="flex gap-4">
          <ManagerProfile manager={stationManagerData} stationID={stationData.id}/>
        </div>
      </div>
     
      <DataTable
        placeholder="Search employees..."
        data={filteredEmployeeList ?? []}
        columns={stationEmployeeColumn}
        ActionButton={
          () =>
          <StationUserActionButton
            stationID={stationData.id}
            employeeRole={stationData.type === StationType.PREPARATION ? UserRole.MEASURING : UserRole.RECIEVER}
          />
        }
        activeTab={activeTab}
        onTabChange={onTabChange}
        category={StationEmployeeCategory}
        searchColumn={"employee_id"}
      />
     
    </div>
  )
}
