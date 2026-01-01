import type { Row } from '@tanstack/react-table'
import DeleteEmployeesDialog from './DeleteEmployeesDialog'
import type { Employee } from '@/types/Employee'
import EmployeeForm from './EmployeeForm'
import { FormType } from '@/types/ComponentTypes/Form'

interface EmployeeActionButtonsProps{
  selectedRows?: Row<Employee>[]
}

export default function EmployeeActionButtons({ selectedRows }: EmployeeActionButtonsProps) {
  return (
    <>
      <EmployeeForm type={FormType.ADD} />
      <DeleteEmployeesDialog selectedRows={selectedRows} />
    </>
  )
}
