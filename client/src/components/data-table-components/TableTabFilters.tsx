import { UserRole } from "@/types/User"
import SelectTabFilter from "./TabFilterComponents/SelectTabFilter"
import TabListFilter from "./TabFilterComponents/TabListFilter"
import type {  Row, Table } from "@tanstack/react-table"
import ColumnTabFilter from "./TabFilterComponents/ColumnTabFilter"
import { type ComponentType } from "react"

type TableProps<T extends object> = {
  table: Table<T>
  ActionButton: ComponentType<{ selectedRows: Row<T>[] }> | ComponentType
  employeeCategory: Record<UserRole, string>
}
function TableTabFilters<T extends object>({ table, ActionButton, employeeCategory }: TableProps<T>) {
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="flex items-center justify-between w-full">
      <SelectTabFilter employeeCategory={employeeCategory} />
      <TabListFilter employeeCategory={employeeCategory} />
      <div className="flex items-center gap-2">
        <ColumnTabFilter table={table} />
        <ActionButton selectedRows={selectedRows}/>
      </div>
    </div>
  )
}

export default TableTabFilters
