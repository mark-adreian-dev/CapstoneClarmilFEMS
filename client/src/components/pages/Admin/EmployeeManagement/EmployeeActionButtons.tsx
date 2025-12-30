import type { Row } from '@tanstack/react-table'
import AddUserForm from './AddUserForm'
import DeleteEmployeesDialog from './DeleteEmployeesDialog'
import type { Employee } from '@/types/Employee'

interface EmployeeActionButtonsProps{
  selectedRows?: Row<Employee>[]
}

export default function EmployeeActionButtons({ selectedRows }: EmployeeActionButtonsProps) {
  return (
    <>
      <AddUserForm />
      <DeleteEmployeesDialog selectedRows={selectedRows} />
    </>
  )
}
