import { Checkbox } from "@/components/ui/checkbox"
import type { Employee } from "@/types/Employee"
import type { ColumnDef } from "@tanstack/react-table"

export const assignEmployeeColumn: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "fullname",
    accessorFn: (row) => {
      const suffix = row.suffix ?? "";
      const first = row.first_name ?? "";
      const middle = row.middle_name ? row.middle_name.charAt(0).toUpperCase() + "." : "";
      const last = row.last_name ?? "";
      // Return a clean string for the table to search against
      return `${suffix} ${first} ${middle} ${last}`.trim().replace(/\s+/g, ' ');
    },
    accessorKey: "first_name",
    header: "Fullname",
    cell: ({ row }) => {
      const fullname = `
      ${row.original.suffix ?? ""}
      ${row.original.first_name}
      ${row.original.middle_name ? row.original.middle_name.split("")[0].toUpperCase() + "." : ""}
      ${row.original.last_name}
      `

      return <div className="text-leftfont-medium">{fullname}</div>
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Employee ID</div>,
    cell: ({ row }) => {
      const employeeID = row.original.employee_id

      return <div className="text-left font-medium">{employeeID}</div>
    },
  },
]