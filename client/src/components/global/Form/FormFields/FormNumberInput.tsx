/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' // Assuming you have a UI Button
import { Minus, Plus } from 'lucide-react' // Clean icons
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput';

interface FormInputProps<T extends object> extends BaseFieldProps<T> {
  type?: string
  step?: number
}

export default function FormNumberInput<T extends object>({
  form,
  name,
  label,
  Icon: IconComponent,
  required,
  className,
  type = "number",
  step = 1
}: FormInputProps<T>) {

  return (
    <form.Field
      name={name}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;

        // Logic to handle numeric changes safely
        const updateValue = (delta: number) => {
          const current = Number(field.state.value) || 0;
          const newValue = current + delta;
          // Cast for TanStack's expected parameter type
          field.handleChange(newValue as any);
        };

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <p> {label}: {required && <span className="text-red-500">*</span>}</p>
            </FieldLabel>

            <div className="flex items-center gap-1">
              <Input
                id={field.name}
                className={`text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
                value={field.state.value as any ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const val = e.target.value;
                  field.handleChange(val === "" ? "" : Number(val) as any);
                }}
                type={type}
              />
              {/* Decrement Button */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => {
                  if (Number(field.state.value) === 0) return
                  updateValue(-step)
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              {/* Increment Button */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => updateValue(step)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    />
  );
}