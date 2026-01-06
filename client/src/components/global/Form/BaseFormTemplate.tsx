import { useState, type ReactNode, type SyntheticEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableActionButton from "@/components/data-table-components/TabFilterComponents/TableActionButton";
import FormSubmitPrompt from "@/components/global/Form/FormFields/FormSubmitPrompt";

import type { BaseFieldProps } from "@/types/ComponentTypes/CustomFormInput";
import { FormType } from "@/types/ComponentTypes/Form";
import type { Icon } from "@tabler/icons-react";


interface FormProps<T extends object> extends Omit<BaseFieldProps<T>, 'name' | 'label' | 'required'> {
  title: string;
  description: string;
  triggerTitle?: string;
  triggerIcon: Icon
  submitIcon: Icon
  targetID?: number
  formType: FormType
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function BaseFormTemplate<T extends object>({
  form,
  title,
  description,
  triggerTitle = "Add Item",
  triggerIcon: TriggerIcon,
  triggerIcon: SubmitIcon,
  formType,
  children,
  open: externalOpen,         // NEW
  onOpenChange: setExternalOpen // NEW
}: FormProps<T>) {

  const [internalOpen, setInternalOpen] = useState(false);

  // Determine if we are being controlled by the Actions menu or using our own button
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;
  const onOpenChange = isControlled ? setExternalOpen : setInternalOpen;

  const handleSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    await form.handleSubmit();
    if (onOpenChange) {
      onOpenChange(false); // Closes either internal or external state
    } else {
      setInternalOpen(false)
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {formType === FormType.ADD ? (
          <TableActionButton Icon={TriggerIcon} title={triggerTitle} type="button" />
        ) : (
          <button type="button" className="flex w-full items-center gap-2 p-2">
          
            <TriggerIcon size={18} stroke={1.5} />
            {triggerTitle}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 md:max-w-1/2 border-primary/30">
        <form>
          <DialogHeader className="mb-10">
            <DialogTitle className="text-2xl font-black">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-100 mb-5 pr-4">
            {children}
          </ScrollArea>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <FormSubmitPrompt submitIcon={SubmitIcon} formSubmit={handleSubmit} form={form} triggerTitle={triggerTitle}/>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}