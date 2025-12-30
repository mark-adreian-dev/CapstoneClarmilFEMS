import Dialog from '@/components/global/Dialog'
import { Label } from '@/components/ui/label'
import { IconEye, IconLock } from '@tabler/icons-react'

export default function ShowPasswordDialog({ password }: { password: string }) {

  return (
    <Dialog
      TriggerComponent={
        <div className=" w-full flex items-center gap-2 p-2 rounded-sm">
          <IconEye />
          Reveal Password
        </div>
      }
      title={"Employee Password"}
      description={"Please exercise professional judgment when using this feature."}
    >
      <div className='h-20 w-full pt-4'>
        <Label className='flex items-center gap-2 text-muted-foreground'>
          <IconLock className='w-5 h-5 '/>
          Password
        </Label>
        <h1 className='text-3xl font-black'>{password}</h1>
      </div>
      
    </Dialog>
  )
}
