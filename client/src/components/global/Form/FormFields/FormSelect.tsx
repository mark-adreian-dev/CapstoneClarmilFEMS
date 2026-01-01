/* eslint-disable @typescript-eslint/no-explicit-any */


import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select } from '@/components/ui/select'
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput';
import type { SelectOption } from '@/types/ComponentTypes/Select'

interface FormSelectProps<T extends object> extends BaseFieldProps<T> {
  options: SelectOption[];
  shape?: any
}

export default function FormSelect<T extends object> ({
  form,
  name,
  label,
  Icon: IconComponent,
  required,
  className,
  options,
  shape
}: FormSelectProps<T>) {
  return (
    <form.Field
      name={name}
      validators={{
        onChange: shape,
      }}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <p>{label}: </p>
              {required && <span className="text-red-500">*</span>}
            </FieldLabel>
            <Select
              value={(field.state.value as string) ?? ""}
              onValueChange={(value) => field.handleChange(value as any)}
            >
              <SelectTrigger
                onBlur={field.handleBlur}
                className={className}
              >
                <SelectValue placeholder={`Select a ${label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}s</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {isInvalid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )
      }}
    />
  )
}
