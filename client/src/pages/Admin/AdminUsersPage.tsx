import { DataTable } from "@/components/data-table";
import { employeeColumn } from "@/components/data-table-components/Columns/EmployeeColumns";
import EmployeeActionButtons from "@/components/pages/Admin/EmployeeManagement/EmployeeActionButtons";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";
import type { Employee } from "@/types/Employee";
import { UserRole } from "@/types/User";
import { useContext, useEffect, useState } from "react";

export default function AdminUsersPage() {
  const { fetchAllEmployeeData, employees } = useContext(EmployeeContext)
  const [employeeData, setEmployeeData] = useState<Employee[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  useEffect(() => {
    fetchAllEmployeeData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  useEffect(() => {
    setEmployeeData(employees)
  }, [employees])

  useEffect(() => {
    switch (activeTab) {
      case UserRole.MEASURING:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.MEASURING))
        return;
      case UserRole.RECIEVER:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.RECIEVER))
        return 
      case UserRole.MANAGER:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.MANAGER))
        return 
      case UserRole.ADMIN:
        setEmployeeData(employees.filter(employee => employee.role === UserRole.ADMIN))
        return
      default: 
        setEmployeeData(employees)
    }
  }, [activeTab, employees])

  return (
    <div>
      <h1 className="text-6xl font-black px-4 mb-8" >Users Management</h1>
      <DataTable
        data={employeeData}
        columns={employeeColumn}
        ActionButton={EmployeeActionButtons}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  )
}
