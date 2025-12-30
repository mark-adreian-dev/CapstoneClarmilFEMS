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
import { useEffect, useState, type ComponentType, type Dispatch } from "react"
import TabContent from "./data-table-components/TabContent"
import { employeeCategory } from "@/utils/UserRolesList"

interface DataTableProps<T extends { id: number | string } & object> {
  data: T[]
  columns: ColumnDef<T>[]
  ActionButton: ComponentType<{ selectedRows?: Row<T>[] }>
  activeTab: string
  setActiveTab: Dispatch<string>
}

export function DataTable<T extends { id: number | string } & object>({
  data: initialData,
  columns,
  ActionButton,
  activeTab,
  setActiveTab
}: DataTableProps<T>) {
  const [data, setData] = useState(() => initialData)
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

  useEffect(() => {
    setData(initialData)
  }, [initialData])


  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
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
      onValueChange={setActiveTab}
      defaultValue="all"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TableTabFilters
          employeeCategory={employeeCategory}
          table={table}
          ActionButton={ActionButton}
        />
      </div>

      <TabContent
        tabValue={"all"}
        sortableId={sortableId}
        dataIds={dataIds}
        sensors={sensors}
        setData={setData}
        table={table}
      />
      {
        Object.entries(employeeCategory).map(([key]) => {
          
          return <TabContent
            key={key}
            tabValue={key}
            sortableId={sortableId}
            dataIds={dataIds}
            sensors={sensors}
            setData={setData}
            table={table}
          />
        })
      }
    </Tabs>
  )
}



