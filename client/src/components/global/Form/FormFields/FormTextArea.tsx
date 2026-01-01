import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput';

interface FormTextAreaProps<T extends object> extends BaseFieldProps<T> {
  height?: number
}

export default function FormTextArea<T extends object>({
  form,
  name,
  label,
  Icon: IconComponent,
  className,
  required
}: FormTextAreaProps<T>) {
  return (
    <form.Field
      name={name}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              {IconComponent && <IconComponent className='w-4 h-4' />}
              <p>{label}: {required && <span className="text-red-500">*</span>}</p>
            </FieldLabel>

            <Textarea
              id={field.name}
              name={field.name}
              value={(field.state.value as unknown as string) ?? ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value as Parameters<typeof field.handleChange>[0])}
              onKeyDown={(e) => e.stopPropagation()}
              aria-invalid={isInvalid}
              placeholder={label}
              autoComplete="off"
              className={className ? `${className}` : `h-20`}
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