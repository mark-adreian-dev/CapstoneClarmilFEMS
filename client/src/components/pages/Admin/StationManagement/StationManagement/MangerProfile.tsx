import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Employee } from "@/types/Employee"
import { IconMail, IconUserSearch, IconQuestionMark, IconX } from "@tabler/icons-react"
import ChangeManagerActionButton from "./ChangeManagerActionButton"
import Dialog from "@/components/global/Dialog"
import { useContext } from "react"
import { StationContext } from "@/context/StationContext/StationContext"

interface MangerProfileProps {
  manager: Employee | undefined
  stationID: number
}

export default function ManagerProfile({ manager, stationID }: MangerProfileProps) {
  const { unAssignManager } = useContext(StationContext)
  const handleUnAssignManager = async () => {
    if (manager) {
      await unAssignManager(manager.id, stationID)
    }
  }

  return (
    <div className="w-full h-full">
      <Card className="min-h-55 flex flex-col justify-center">
        <CardContent>
          {manager ? (
            <>
              <CardHeader className="px-0">
                <CardDescription className="pb-0 flex items-center gap-2">
                  <Badge className="bg-yellow-500/20" variant={"outline"}>
                    Manager Profile
                  </Badge>
                  <Badge className="bg-yellow-500/20" variant={"outline"}>
                    #{manager.employee_id}
                  </Badge>
                </CardDescription>
                <CardTitle className="mb-5">
                  <h1 className="text-4xl font-black truncate">
                    {`
                    ${manager.suffix ?? ""}
                    ${manager.first_name}
                    ${manager.middle_name ? manager.middle_name.split('')[0].toUpperCase() + "." : ""}
                    ${manager.last_name}
                  `}
                  </h1>
                </CardTitle>
                <CardAction>
                  <Dialog
                    TriggerComponent={
                      <div className='flex items-center gap-2 w-fit border border-muted-foreground/40 p-1 rounded-md px-3 bg-red-500 hover:bg-primary hover:text-accent cursor-pointer font-semibold'>
                        <IconX className='w-4 h-4' />
                        <span className='text-sm'>Remove</span>
                      </div>
                    }
                    title={"Remove as Manager?"}
                    description={"This will unassign the current manager from this station. The station will remain without a manager until a new one is appointed."}
                    actionLabel="Unassign"
                    actionButtonColorClassname="bg-red-500 text-primary hover:text-accent"
                    action={handleUnAssignManager}
                    
                  />
                </CardAction>
              </CardHeader>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconMail className="w-4 h-4" />
                  <p className="text-sm">{manager.email}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconUserSearch className="w-4 h-4" />
                  <p className="text-sm">#{manager.employee_id}</p>
                </div>
              </div>
            </>
          ) : (
            /* Placeholder state to prevent layout shift */
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <IconQuestionMark className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h2 className="text-2xl font-black text-muted-foreground/30 uppercase tracking-tighter">
                Not Assigned
              </h2>
              <p className="text-sm text-muted-foreground mb-4">No manager found for this station</p>
                <ChangeManagerActionButton stationID={stationID} />
            </div>
          )}
          <CardFooter className="px-0" />
        </CardContent>
      </Card>
    </div>
  )
}