import TableActionButton from '@/components/data-table-components/TabFilterComponents/TableActionButton'
import Dialog from '@/components/global/Dialog'
import { EmployeeContext } from '@/context/EmployeeContext/EmployeeContext'
import type { Employee } from '@/types/Employee'
import { IconTrash } from '@tabler/icons-react'
import type { Row } from '@tanstack/react-table'
import { useContext } from 'react'

interface DeleteEmployeeDialogProps {
  selectedRows?: Row<Employee>[]
}
export default function DeleteEmployeeDialog({ selectedRows }: DeleteEmployeeDialogProps) {
  const { isLoading, deleteBulkEmployee } = useContext(EmployeeContext)
  if (!selectedRows) return
  
  const handleDeleteEmployees = async () => {
    const ids: number[] = []
    selectedRows.map(row => ids.push(Number(row.id)))
    await deleteBulkEmployee(ids)
  }
  return (
    <Dialog
      TriggerComponent={
        <TableActionButton
          Icon={IconTrash}
          disabled={selectedRows.length === 0}
          title="Delete Employees"
          type="button"
          className={`${selectedRows.length > 0 && 'bg-red-600!'}`}
        />
      }
      title={'Delete all employees?'}
      description={'This action is cannot be undone. Once action is taken employee data will be removed permanently'}
      actionLabel={'Delete'}
      actionButtonColorClassname={'bg-red-500 text-primary hover:text-primary-foreground'}
      action={handleDeleteEmployees} 
      isLoading={isLoading}
    />
  )
}
