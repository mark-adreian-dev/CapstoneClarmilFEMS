import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, type MouseEvent, type ReactNode, type SyntheticEvent } from "react"

interface DialogProps{
  TriggerComponent: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionButtonColorClassname?: string
  action?: (e?: SyntheticEvent) => Promise<unknown> | unknown
  children?: ReactNode
  isLoading?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void;
 }

export default function Dialog({
  TriggerComponent,
  title,
  description,
  actionLabel,
  action,
  actionButtonColorClassname,
  children,
  isLoading,
  // Destructure the new props
  open: externalOpen,
  onOpenChange: setExternalOpen,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  // Determine if the component is being controlled externally
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  // Create a unified toggle function
  const handleOpenChange = (open: boolean) => {
    if (isControlled) {
      setExternalOpen?.(open);
    } else {
      setInternalOpen(open);
    }
  };

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    if (action) {
      action(e);
      // Close dialog after action if controlled
      if (isControlled) setExternalOpen?.(false);
    }
  }

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={isOpen}>
      {/* Only render the trigger if NOT controlled. 
         This prevents the "ghost button" from appearing in your table row. 
      */}
      {!isControlled && (
        <AlertDialogTrigger asChild>
          {TriggerComponent}
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {actionLabel ? "Cancel" : "Close"}
          </AlertDialogCancel>
          {actionLabel && (
            <AlertDialogAction
              disabled={isLoading}
              onClick={handleConfirm}
              className={actionButtonColorClassname + " cursor-pointer"}
            >
              {actionLabel}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
