import { isAxiosError } from "axios"
import { toast } from "sonner"

export const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    console.log(error)
    toast.error(error.response?.data.message, {
      id: "main-toaster"
    })
  }
} 