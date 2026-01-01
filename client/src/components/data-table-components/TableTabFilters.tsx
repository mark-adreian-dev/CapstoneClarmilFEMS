import SelectTabFilter from "./TabFilterComponents/SelectTabFilter"
import TabListFilter from "./TabFilterComponents/TabListFilter"
import type { Row, Table } from "@tanstack/react-table"
import ColumnTabFilter from "./TabFilterComponents/ColumnTabFilter"
import { type ComponentType } from "react"
import TableSearchField from "./TableSearchField"

type CategoryMap<K extends string | number | symbol> = Record<K, string>;

interface TableTabFiltersProps<TData extends object, K extends string | number | symbol> {
  table: Table<TData>
  activeTab: string
  ActionButton: ComponentType<{ selectedRows?: Row<TData>[] }>
  category: CategoryMap<K>
  placeholder: string
  searchColumn: Extract<keyof TData, string>;
  onTabChange: (value: K) => void
  
}
function TableTabFilters<TData extends object, K extends string | number>({
  table,
  activeTab,
  ActionButton,
  category,
  searchColumn,
  placeholder,
  onTabChange
}: TableTabFiltersProps<TData, K>) {
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="flex items-start justify-between w-full">
      
      <div>
        <TableSearchField
          placeholder={placeholder}
          table={table}
          searchColumn={searchColumn}
        />
        <SelectTabFilter<K>
          category={category}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        <TabListFilter category={category} />
      </div>
     
     

      <div className="flex items-center gap-2">
        <ColumnTabFilter table={table} />
        <ActionButton selectedRows={selectedRows} />
      </div>
    </div>
  )
}

export default TableTabFilters
