import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Employee } from "@/types/Employee"
import type { ColumnDef } from "@tanstack/react-table"

export const assignManagerColumn: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: () => <div className="w-4" />, // No "Select All" for radio buttons
    cell: ({ row }) => (
      <RadioGroup
        value={row.getIsSelected() ? "selected" : ""}
        onValueChange={() => {
          // 1. Clear all previous selections
          row.getToggleSelectedHandler();
          // 2. Select the current row
          row.toggleSelected(true);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="selected"
            checked={row.getIsSelected()}
            // In TanStack Table, selecting one row while clearing others 
            // is best handled via table options (see below)
            onClick={() => row.toggleSelected(true)}
          />
        </div>
      </RadioGroup>
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