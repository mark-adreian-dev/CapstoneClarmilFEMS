"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Employee } from "@/types/Employee"
import { assignEmployeeColumn } from "@/components/data-table-components/Columns/AssignEmployeeColumn"
import { IconSearch } from "@tabler/icons-react"
import { SheetFooter, SheetClose } from "@/components/ui/sheet"
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext"
import { useContext } from "react"
import { StationContext } from "@/context/StationContext/StationContext"

interface AssignEmployeeTableProps {
  data: Employee[]
  stationID: number
}

export function AssignEmployeeTable({ data, stationID }: AssignEmployeeTableProps) {
  const { assignEmployees } = useContext(EmployeeContext)
  const { stations } = useContext(StationContext)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: assignEmployeeColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleEmployeeAssignment = async () => {
    const selectedRow = table.getSelectedRowModel().rows
    const ids = selectedRow.map(row => row.original.id)
    const stationData = stations.find(station => station.id === stationID)

    if (stationData) {
      await assignEmployees(ids, stationData)
    }
  }

  return (
    <>
      <div className="w-full h-full px-4">
        <div className="flex items-center gap-4 py-4">
          <IconSearch />
          <Input
            placeholder="Search employees..."
            value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("fullname")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                      colSpan={assignEmployeeColumn.length}
                    className="h-24 text-center"
                  >
                    No Unassigned employee.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
     
      <SheetFooter>
        <Button onClick={handleEmployeeAssignment} disabled={table.getSelectedRowModel().rows.length === 0}>Save changes</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
