import { IconGenderFemale, IconGenderMale, IconMail } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../ui/checkbox"
import { Badge } from "../../ui/badge"
import DragHandle from "../ColumnComponents/DragHandle"
import type { Employee } from "@/types/Employee"
import { Sex, UserRole } from "@/types/User"
import { StationEmployeeActions } from "./Actions/StationEmployeeActions"


export const stationEmployeeColumn: ColumnDef<Employee>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,

  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
    enableHiding: true,
    cell: ({ row }) => (
      <span>
        {`#${row.original.employee_id}`}
      </span>
    )
  },
  {
    accessorKey: "name",
    header: "Fullname",
    enableHiding: true,
    cell: ({ row }) => (
      <span>
        {
          `
          ${row.original.suffix ?? ""} 
          ${row.original.first_name} 
          ${row.original.middle_name ? row.original.middle_name.split('')[0] + "." : ''}
          ${row.original.last_name}
        `
        }
      </span>
    )

  },
  {
    accessorKey: "email",
    header: "Email Address",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="w-fit">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          <IconMail />
          {row.original.email}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "sex",
    header: "Sex",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="w-fit">
        <p className="flex items-center gap-2">
          {
            row.original.sex === Sex.MALE ? <IconGenderMale className="text-blue-400" /> : <IconGenderFemale className="text-pink-400" />
          }


          {row.original.sex.toLocaleUpperCase()}
        </p>
      </div>
    ),
  },

  {
    header: "Station",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="w-fit">
        <p className="flex items-center gap-2">
          {
            (row.original.role === UserRole.ADMIN ||
              row.original.role === UserRole.MANAGER) &&
            <Badge variant={'outline'}>N/A</Badge>
          }
          {
            (row.original.role === UserRole.MEASURING ||
              row.original.role === UserRole.RECIEVER) &&
            <Badge variant={'outline'}>{row.original.assigned_station?.name}</Badge>
          }
        </p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    enableHiding: true,
    cell: ({ row }) => {
      const role = row.original.role
      return <div className="w-32">
        <Badge
          variant="outline"
          className={
            `text-muted-foreground px-1.5 
            ${role === UserRole.ADMIN && "text-violet-300 border border-violet-300"}
            ${role === UserRole.MANAGER && "text-yellow-300 border border-yellow-300"}
            ${role === UserRole.MEASURING && "text-green-300 border border-green-300"}
            ${role === UserRole.RECIEVER && "text-blue-300 border border-blue-300"}
            `
          }
        >
          {
            role === UserRole.ADMIN ? "Admin" :
              role === UserRole.MANAGER ? "Manager" :
                role === UserRole.MEASURING ? "Preparation" :
                  role === UserRole.RECIEVER ? "Processing" : ""
          }
        </Badge>
      </div>
    }
  },
  {

    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => (
      <StationEmployeeActions row={row} />
    ),
  },
]