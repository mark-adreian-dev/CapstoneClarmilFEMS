import Dialog from '@/components/global/Dialog'
import { EmployeeContext } from '@/context/EmployeeContext/EmployeeContext'
import { IconTrash } from '@tabler/icons-react'
import { useContext } from 'react'

export default function DeleteEmployeeDialog({ id }: { id: number }) {
  const { deleteEmployee, isLoading } = useContext(EmployeeContext)
  const handleDeleteEmployee = async () => {
    await deleteEmployee(id)
  }
  
  return (
    <Dialog
      TriggerComponent={
        <div className="text-red-400 w-full flex items-center gap-2 hover:bg-red-500/20 p-2 rounded-sm">
          <IconTrash className="text-red-400" />
          Delete
        </div>
      }
      title={"Remove employee?"}
      description={"This action is cannot be undone. once action is taken employee will be removed permanently."}
      actionLabel={"Remove Employee"}
      actionButtonColorClassname={"bg-red-500! text-primary hover:!bg-primary hover:text-primary-foreground"}
      action={handleDeleteEmployee}
      isLoading={isLoading}
    />
  )
}
