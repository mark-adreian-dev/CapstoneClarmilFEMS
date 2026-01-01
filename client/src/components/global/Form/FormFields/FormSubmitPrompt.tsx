import type { BaseFieldProps } from "@/types/ComponentTypes/CustomFormInput"
import Dialog from "../../Dialog"
import { Button } from "@/components/ui/button"
import { IconUserPlus } from "@tabler/icons-react"
import type { SyntheticEvent } from "react"

interface FormInputProps<T extends object> extends Omit<BaseFieldProps<T>, 'name' | 'label'> {
  formSubmit: (e?: SyntheticEvent) => Promise<unknown> | unknown
  triggerTitle: string
}

export default function FormSubmitPrompt<T extends object>({
  form,
  formSubmit,
  triggerTitle
}: FormInputProps<T>) {
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isDirty]}>
      {([canSubmit, isDirty]) => (

        <Dialog
          TriggerComponent={
            <Button type="button" disabled={!canSubmit || !isDirty}>
              {form.state.isSubmitting ?
                <p>Saving...</p>
                :
                <>
                  <IconUserPlus />
                  <p>{triggerTitle}</p>
                </>}
            </Button>
          }
          title={triggerTitle}
          description={"Are you sure that the specified details is correct and true?"}
          actionLabel="Save"
          actionButtonColorClassname="bg-primary text-primary-foreground"
          action={formSubmit}
        />
      )}
    </form.Subscribe> 
  )
}
