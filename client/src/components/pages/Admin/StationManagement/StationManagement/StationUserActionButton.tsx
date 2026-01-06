import { IconUsersPlus } from '@tabler/icons-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useContext, useMemo } from 'react'
import { EmployeeContext } from '@/context/EmployeeContext/EmployeeContext'
import type { UserRole } from '@/types/User'
import { AssignEmployeeTable } from './AssignEmployeeTable'



interface StationUserActionButtonProps {
  stationID: number
  employeeRole: UserRole
} 

export default function StationUserActionButton({ stationID, employeeRole }: StationUserActionButtonProps) {
  const { employees } = useContext(EmployeeContext)
  const unAssignedEmployees = useMemo(() => {
    if (!stationID) return []

    const unAssignedList = employees.filter(employee => employee.role === employeeRole && !employee.station_id)
    return unAssignedList

  }, [employeeRole, employees, stationID])



  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className='flex items-center gap-2 w-32.5 border border-muted-foreground/40 p-1 rounded-md px-3 bg-muted-foreground/10 hover:bg-primary hover:text-accent cursor-pointer font-semibold'>
            <IconUsersPlus className='w-4 h-4'/>
            <span className='text-sm'>Assign Staff</span>
          </div>
        </SheetTrigger>
        <SheetContent className='w-500!'>
          <SheetHeader>
            <SheetTitle className='text-2xl font-black'>Assign Staff</SheetTitle>
            <SheetDescription>
              Add new staff to the station
            </SheetDescription>
            
          </SheetHeader>
          <AssignEmployeeTable data={unAssignedEmployees} stationID={stationID}/>
        </SheetContent>
      </Sheet>
      
    </>
  )
}
