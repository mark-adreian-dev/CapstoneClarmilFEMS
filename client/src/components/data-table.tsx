import * as React from "react"
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core"

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Tabs,
} from "@/components/ui/tabs"
import TableTabFilters from "./data-table-components/TableTabFilters"
import { useMemo, type ComponentType } from "react"
import TabContent from "./data-table-components/TabContent"

interface DataTableProps<TData extends { id: number | string } & object, K extends string | number> {
  data: TData[]
  columns: ColumnDef<TData>[]
  ActionButton: ComponentType<{ selectedRows?: Row<TData>[] }>
  activeTab: string
  placeholder: string
  onTabChange: (value: K | string) => void
  category: Record<K | string, string>
  searchColumn: Extract<keyof TData, string>;
}

export function DataTable<TData extends { id: number | string } & object, K extends string | number>({
  data,
  columns,
  ActionButton,
  placeholder,
  activeTab,
  onTabChange,
  category,
  searchColumn
  
}: DataTableProps<TData, K>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  })
  
  
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )
  const memoizedColumn = useMemo(() => columns, [columns]);

  

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: memoizedColumn,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })


  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TableTabFilters
          searchColumn={searchColumn}
          placeholder={placeholder}
          category={category}
          table={table}
          ActionButton={ActionButton}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
      {Object.values(category).map((value) => (
          activeTab === value &&
          <TabContent
            key={value as string}
            tabValue={value as string}
            sortableId={sortableId}
            dataIds={dataIds}
            sensors={sensors}
            table={table}
          />
        
      ))}
    </Tabs>
  )
}



