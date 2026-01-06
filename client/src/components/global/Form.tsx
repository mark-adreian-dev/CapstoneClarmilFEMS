/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseFormTemplate from './Form/BaseFormTemplate'
import type z from 'zod'
import { useForm } from '@tanstack/react-form';
import type { ReactNode } from 'react';
import type { Icon } from '@tabler/icons-react';
import type { FormInstance } from '@/types/ComponentTypes/CustomFormInput';
import type { FormType } from '@/types/ComponentTypes/Form';

interface FormProps<T extends object> {
  formSchema: z.ZodObject<any>
  defaultValues: T;
  onSubmit: (values: T, id?:number) => Promise<void> | void;
  title: string;
  description: string;
  triggerTitle: string;
  formType: FormType
  triggerIcon: Icon
  submitIcon: Icon
  targetID?: number
  children: (form: FormInstance<T>) => ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function Form<T extends object>({
  formSchema,
  defaultValues,
  onSubmit,
  title,
  formType,
  description,
  triggerTitle,
  submitIcon,
  triggerIcon,
  targetID,
  children,
  open,
  onOpenChange

}: FormProps<T>) {
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: formSchema as any,
      onChange: formSchema as any,
    },
    onSubmitInvalid(props) {
      console.error("Form is invalid!", props.value);
    },

    onSubmit: async ({ value }) => {
      await onSubmit(value)
      // form.reset()
    },
  });

  return (
    <BaseFormTemplate
      title={title}
      description={description}
      triggerIcon={triggerIcon}
      triggerTitle={triggerTitle}
      form={form}
      formType={formType}
      targetID={targetID}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children(form)}
    </BaseFormTemplate>
  )
}
