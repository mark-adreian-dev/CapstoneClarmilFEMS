import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput';

interface FormInputProps<T extends object> extends BaseFieldProps<T> {
  type?: string
}
export default function FormInput<T extends object>({
  form,
  name,
  label,
  Icon: IconComponent,
  className,
  required,
  type = "text"
}: FormInputProps<T>) {
  return (
    <form.Field
      name={name}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <p>
                {label}: {required && <span className="text-red-500">*</span>}
              </p>
              
            </FieldLabel>

            <Input
              id={field.name}
              name={field.name}
              // Cast generic value to string/number for HTML input
              value={(field.state.value as unknown as string) ?? ""}
              onBlur={field.handleBlur}
              // Match the exact parameter type expected by TanStack
              onChange={(e) =>
                field.handleChange(e.target.value as Parameters<typeof field.handleChange>[0])
              }
              onKeyDown={(e) => e.stopPropagation()}
              aria-invalid={isInvalid}
              placeholder={label}
              autoComplete="off"
              className={className}
              type={type}
            />

            {isInvalid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        );
      }}
    />
  );
}