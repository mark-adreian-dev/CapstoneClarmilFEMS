import type { Table } from "@tanstack/react-table"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight } from "@tabler/icons-react"
import { Button } from "../../ui/button"

interface TableFooterProps<T extends object> {
  table: Table<T>
}
export default function TableFooter<T extends object>({ table }: TableFooterProps<T>) {
  return (

    <div className="flex items-center justify-between px-4 mt-2" >
      <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden lg:flex items-center gap-2">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">Rows per page</Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => table.setPageSize(Number(value))}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[20, 40, 60, 80, 100].map(n => (
                <SelectItem key={n} value={`${n}`}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button size="icon" variant="outline" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="hidden lg:flex"><IconChevronsLeft /></Button>
          <Button size="icon" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><IconChevronLeft /></Button>
          <Button size="icon" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><IconChevronRight /></Button>
          <Button size="icon" variant="outline" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="hidden lg:flex"><IconChevronsRight /></Button>
        </div>
      </div>
    </div>
  )
}
