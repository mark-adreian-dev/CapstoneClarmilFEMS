import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../ui/checkbox"
import DragHandle from "../ColumnComponents/DragHandle"
import type { Ingridient } from "@/types/Ingridient"
import { Badge } from "@/components/ui/badge"
import { IngridientActions } from "./Actions/IngridientActions"
export const ingridientColumn: ColumnDef<Ingridient>[] = [

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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span>{row.original.name}</span>
      )
    } 
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <p className="max-w-70 wrap-break-word whitespace-normal leading-relaxed">
          {row.original.description}
        </p>
      )
    }
  },
  // {
  //   accessorKey: "type",
  //   header: "Ingridient type",
  //   cell: ({ row }) => {
  //     return (
  //       <p>{row.original.type}</p>
  //     )
  //   }
  // },
  // {
  //   accessorKey: "stock_quantity",
  //   header: "Quantity",
  //   cell: ({ row }) => {
  //     return (
  //       <span>{row.original.stock_quantity}</span>
  //     )
  //   }
  // },
  {
    accessorKey: "reorder_level",
    header: "Stock Level",
    cell: ({ row }) => {
      const quantity = Number(row.original.stock_quantity)
      const reorder_level = Number(row.original.reorder_level)
      return (
        <Badge
          className={`block ${quantity <= reorder_level ? 'bg-red-500/20' : 'bg-green-500/20'}`}
          variant={"outline"}
        >
          <p>{quantity <= reorder_level ? "Low" : "Good"}</p>

        </ Badge >
      )
    }
  },
  // {
  //   accessorKey: "unit_cost",
  //   header: "Unit Price",
  //   cell: ({ row }) => {
  //     return (
  //       <Badge variant={"outline"}>{formatPHP(row.original.unit_cost)}</Badge>
  //     )
  //   }
  // },
  // {
  //   header: "Total",
  //   cell: ({ row }) => {
  //     const unitCost = row.original.unit_cost
  //     const quantity = row.original.stock_quantity

  //     const total = unitCost * quantity
  //     return (
  //       <Badge variant={"outline"}>{formatPHP(total)}</Badge>
  //     )
  //   }
  // },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <IngridientActions row={row} />,
  },
]

