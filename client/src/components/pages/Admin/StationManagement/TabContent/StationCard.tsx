import Dialog from '@/components/global/Dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from '@/components/ui/card'
import { EmployeeContext } from '@/context/EmployeeContext/EmployeeContext'
import { StationContext } from '@/context/StationContext/StationContext'
import { StationType } from '@/types/Station'
import { UserRole } from '@/types/User'
import { IconBuildingFactory2, IconTrash } from '@tabler/icons-react'
import { useContext, useMemo } from 'react'

interface StationCardProps {
  type: StationType
  name: string
  description: string
  manager_id: number | null
  stationID: number
}

export default function StationCard({ type, name, description, manager_id, stationID }: StationCardProps) {
  const { deleteStation } = useContext(StationContext)
  const { employees } = useContext(EmployeeContext)
  const { isLoading } = useContext(StationContext)

  const employeeCount = useMemo(() => {
    return employees.filter(employee => {
      if (employee.role === UserRole.MEASURING || employee.role === UserRole.RECIEVER) {
        if (employee.assigned_station) {
          if (employee.assigned_station.id === stationID) {
            return employee
          }
        }
      }
    }).length;
  }, [employees, stationID]);

  const managerData = useMemo(() => {
    if (!manager_id) return
    const managerData = employees.find(employee => employee.id === manager_id && employee.role === UserRole.MANAGER)
    
    if (!managerData) return
    return managerData
  }, [employees, manager_id])
  
  const handleDeleteStation = async (id: number) => {
    const employeesAssigned = employees.filter(employee => employee.station_id === id)
    await deleteStation(id, employeesAssigned)
  } 


  return (
    <div className='transition-all duration-300 rounded-xl 
            hover:shadow-[0_0_20px_0.001px_rgba(255,255,255,0.5)] hover:-translate-y-1'>
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          {
            type === StationType.PREPARATION &&
            <Badge variant="outline" className='bg-green-500/20'>Preparation</Badge>
          }
          {
            type === StationType.PROCESSING &&
            <Badge variant="outline" className='bg-blue-500/20'>Processing</Badge>
          }
          <CardTitle className="flex items-center gap-2 text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            <IconBuildingFactory2 />
            <p>{name}</p>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
            <div onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}>
              <Dialog
                TriggerComponent={
                  <Button variant="outline" size={"icon-sm"} className='cursor-pointer hover:bg-red-700!'>
                    <IconTrash />
                  </Button>
                }
                title={'Delete the station'}
                description={'are you sure?'}
                isLoading={isLoading}
                actionLabel={"Delete station"}
                actionButtonColorClassname='bg-red-500! text-primary'
                action={() => {handleDeleteStation(stationID)}}
              />
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {
            managerData ?
              <div>
                <p className='text-xs'>Manager: {`${managerData.suffix ?? ""} ${managerData.first_name} ${managerData.last_name}`}</p>

              </div> :
              <div>
                <p className='text-xs italic'>No manager</p>
              </div>
          }

          <p className='text-xs text-muted-foreground italic'>{employeeCount} employees</p>
        </CardFooter>
      </Card>
    </div>
    
          
   
  )
}
