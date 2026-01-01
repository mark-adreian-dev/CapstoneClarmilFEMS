/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

interface FormDateSelectorProps<T extends object> extends BaseFieldProps<T> {
  shape?: any
}

export default function FormDateSelector<T extends object>({
  form,
  name,
  label,
  Icon: IconComponent,
  required,
  shape

}: FormDateSelectorProps<T>) {
  const [open, setOpen] = useState(false)
  
  return (
    <form.Field
      name={name}
      validators={{
        onChange: shape,
      }}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
        const dateValue = field.state.value as Date | null | undefined;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <p>{label}: {required && <span className="text-red-500">*</span>}</p>
            </FieldLabel>
            <div className="flex flex-col gap-3">
              <Popover
                open={open}
                onOpenChange={setOpen}
               
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={field.name}
                    className="w-full justify-between font-normal"
                  >
                    {dateValue instanceof Date
                      ? dateValue.toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                  onPointerDownOutside={(e) => e.preventDefault()}
                >
                  <Calendar
                    mode="single"
                    selected={dateValue ?? undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.handleChange((date ?? null) as any)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {isInvalid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )
      }}
    />
  );
}