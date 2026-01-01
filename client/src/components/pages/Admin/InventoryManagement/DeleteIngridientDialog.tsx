import Dialog from '@/components/global/Dialog'
import { IngridientContext } from '@/context/IngridientsContext/IngridientsContext';
import { IconTrash } from '@tabler/icons-react'
import { useContext } from 'react'

interface DeleteIngridientDialogProps {
  id: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DeleteIngridientDialog({ id, open, onOpenChange }: DeleteIngridientDialogProps) {
  const { deleteIngridient, isLoading } = useContext(IngridientContext)

  const handleDeleteIngridient = async () => {
    await deleteIngridient(id);
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
      title={"Remove ingridient?"}
      description={"This action cannot be undone. Once action is taken, the ingridient will be removed permanently."}
      actionLabel={"Remove Ingridient"}
      actionButtonColorClassname={"bg-red-500! text-primary hover:!bg-primary hover:text-primary-foreground"}
      action={handleDeleteIngridient}
      isLoading={isLoading}
    />
  )
}