import type { UserRole } from "@/types/User";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";

export default function TabListFilter({ employeeCategory }: { employeeCategory: Record<UserRole, string> }) {
  const { employees } = useContext(EmployeeContext)

  return (
    <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @6xl/main:flex gap-1">
      <TabsTrigger className="cursor-pointer" value="all">All</TabsTrigger>
      {
        Object.entries(employeeCategory).map(([key, value]) => {
          return <TabsTrigger key={value} className="cursor-pointer hover:bg-primary-foreground" value={key}>
            
            {value}
            <Badge className="text-primary">
              {
                employees
                  .filter(employee => employee.role === key).length
              }
            </Badge>
          </TabsTrigger>
        })
      }
    </TabsList>
  )
}
