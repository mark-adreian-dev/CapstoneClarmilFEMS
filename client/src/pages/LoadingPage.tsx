
import { Spinner } from "@/components/ui/spinner"

export default function LoadingPage() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Spinner className="w-20 h-20"/>
    </div>
  )
}
