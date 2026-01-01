import { DataTable } from "@/components/data-table";
import { employeeColumn } from "@/components/data-table-components/Columns/EmployeeColumns";
import EmployeeActionButtons from "@/components/pages/Admin/EmployeeManagement/EmployeeActionButtons";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";
import { EmployeeCategory, type Employee } from "@/types/Employee";
import { UserRole } from "@/types/User";
import { useContext, useEffect, useState } from "react";

export default function AdminUsersPage() {
  const { fetchAllEmployeeData, employees, activeTab, onTabChange  } = useContext(EmployeeContext)
  const [employeeData, setEmployeeData] = useState<Employee[]>([])

  useEffect(() => { 
    fetchAllEmployeeData()
  }, [fetchAllEmployeeData]) 

  useEffect(() => {
    setEmployeeData(employees)
  }, [employees])

  useEffect(() => {
    switch (activeTab) {
      case EmployeeCategory.ALL:
        setEmployeeData(employees)
        return;
      case EmployeeCategory.MEASURING:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.MEASURING))
        return;
      case EmployeeCategory.RECIEVER:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.RECIEVER))
        return 
      case EmployeeCategory.MANAGER:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.MANAGER))
        return 
      case EmployeeCategory.ADMIN:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.ADMIN))
        return
      default: 
        setEmployeeData(employees)
    }
  }, [activeTab, employees])

  return (
    <div>
      <h1 className="text-6xl font-black px-4 mb-8" >Employee Management</h1>
      <DataTable
        placeholder="Search employees..."
        data={employeeData}
        columns={employeeColumn}
        ActionButton={EmployeeActionButtons}
        activeTab={activeTab}
        onTabChange={onTabChange}
        category={EmployeeCategory}
        searchColumn={"employee_id"}
      />
    </div>
  )
}
