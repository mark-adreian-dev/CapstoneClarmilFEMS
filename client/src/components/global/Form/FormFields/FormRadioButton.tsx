/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BaseFieldProps } from "@/types/ComponentTypes/CustomFormInput";
import type { RadioOption } from "@/types/ComponentTypes/RadioButton";

interface FormRadioButtonProps<T extends object> extends BaseFieldProps<T> {
  options: RadioOption[];
  className?: string
}

export default function FormRadioButton<T extends object>({
  form,
  name,
  label,
  Icon: IconComponent,
  className,
  options,
  required,
}: FormRadioButtonProps<T>) {
  return (
    <form.Field
      name={name}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
        return (
          <Field data-invalid={isInvalid} className={`w-[40%] ${className}`}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <p>{label}: </p>
              {required && <span className="text-red-500">*</span>}
            </FieldLabel>
            <RadioGroup
              value={(field.state.value as string) ?? ""}
              onValueChange={(value) => field.handleChange(value as any)}
              onBlur={field.handleBlur}
              className="flex items-center h-10 gap-6"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={option.value}
              
                    id={`${field.name}-${option.value}`}
                  />
                  <Label
                    htmlFor={`${field.name}-${option.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {isInvalid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )
      }}
    />
  )
}
