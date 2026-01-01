import Dialog from '@/components/global/Dialog'
import { EmployeeContext } from '@/context/EmployeeContext/EmployeeContext'
import { IconTrash } from '@tabler/icons-react'
import { useContext } from 'react'

interface DeleteEmployeeDialogProps {
  id: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void; 
}

export default function DeleteEmployeeDialog({ id, open, onOpenChange }: DeleteEmployeeDialogProps) {
  const { deleteEmployee, isLoading } = useContext(EmployeeContext)

  const handleDeleteEmployee = async () => {
    await deleteEmployee(id);
    if (onOpenChange) onOpenChange(false);
  };

  const isControlled = open !== undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}

      TriggerComponent={
        !isControlled ? (
          <div className="text-red-400 w-full flex items-center gap-2 hover:bg-red-500/20 p-2 rounded-sm">
            <IconTrash className="text-red-400" />
            Delete
          </div>
        ) : undefined
      }
      title={"Remove employee?"}
      description={"This action cannot be undone. Once action is taken, the employee will be removed permanently."}
      actionLabel={"Remove Employee"}
      actionButtonColorClassname={"bg-red-500! text-primary hover:!bg-primary hover:text-primary-foreground"}
      action={handleDeleteEmployee}
      isLoading={isLoading}
    />
  )
}