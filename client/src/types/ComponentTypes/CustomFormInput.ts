import type { Icon } from '@tabler/icons-react'
import { type ReactFormExtendedApi, type DeepKeys } from '@tanstack/react-form'

/**
 * We use 'any' for the validator slots to allow Zod/StandardSchema 
 * to inject their own issue types without causing assignability errors.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormInstance<T extends object> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any, any, any>

export interface BaseFieldProps<T extends object> {
  form: FormInstance<T>
  name: DeepKeys<T>
  label: string
  required?: boolean
  Icon?: Icon
  className?: string
}
