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
 }

export default function Dialog({
  TriggerComponent,
  title,
  description,
  actionLabel,
  action,
  actionButtonColorClassname,
  children,
  isLoading
}: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    if (action) {
      action(e);
    }
  }
  
  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        {TriggerComponent}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">{actionLabel ? "Cancel" : "Close"}</AlertDialogCancel>
          {
            actionLabel && <AlertDialogAction disabled={isLoading} onClick={handleConfirm} className={actionButtonColorClassname + " cursor-pointer"}>
              {actionLabel}
            </AlertDialogAction>
          }
         
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
