import type { UserRole } from "@/types/User";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function SelectTabFilter({ employeeCategory }: {employeeCategory: Record<UserRole, string>}) {
  return (
    
    <div className="flex items-center gap-4 @6xl/main:hidden">
      <Label htmlFor="view-selector">
        View:
      </Label>
      <Select defaultValue="all">
        <SelectTrigger
          className="flex w-fit 6xl/main:hidden"
          size="sm"
          id="view-selector"
        >
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {
            Object.entries(employeeCategory).map(([key, value], index) => {
              return <SelectItem key={index} value={key}>{value}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
    </div>
    
  )
}