import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { AssignManagerTable } from "./AssignManagerTable"
import { useContext, useMemo } from "react"
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext"
import { UserRole } from "@/types/User"
import { IconUserPlus } from "@tabler/icons-react"



interface StationUserActionButtonProps {
  stationID: number
} 

export default function ChangeManagerActionButton({ stationID }: StationUserActionButtonProps) {
  const { employees } = useContext(EmployeeContext)

  const unAssignedManager = useMemo(() => {
    if (!stationID) return []
    const unAssignedList = employees.filter(employee => employee.role === UserRole.MANAGER)
    return unAssignedList

  }, [employees, stationID])


  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className='flex items-center gap-2 w-fit border border-muted-foreground/40 p-1 rounded-md px-3 bg-muted-foreground/10 hover:bg-primary hover:text-accent cursor-pointer font-semibold'>
            <IconUserPlus className='w-4 h-4' />
            <span className='text-sm'>Assign Manager</span>
          </div>
        </SheetTrigger>
        <SheetContent className='w-500!'>
          <SheetHeader>
            <SheetTitle className='text-2xl font-black'>Assign Manager</SheetTitle>
            <SheetDescription>
              Add new staff to the station
            </SheetDescription>
            
          </SheetHeader>
          <AssignManagerTable data={unAssignedManager} stationID={stationID} />
          MANAGER
        </SheetContent>
      </Sheet>
      
    </>
  )
}
