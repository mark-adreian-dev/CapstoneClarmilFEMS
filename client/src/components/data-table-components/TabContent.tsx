import { DndContext, closestCenter, type DragEndEvent, type SensorDescriptor, type SensorOptions, type UniqueIdentifier } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "../ui/table"
import { TabsContent } from "../ui/tabs"
import { flexRender, type Table as TableAsProps } from "@tanstack/react-table"
import { useContext } from "react"
import { DraggableRow } from "./TabContentComponents/DraggableRow"
import TableFooter from "./TableFooterComponents/TableFooter"
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext"

interface TabContentProps<T extends { id: string | number }> {
  table: TableAsProps<T>
  sensors: SensorDescriptor<SensorOptions>[]
  sortableId: string
  tabValue: string
  dataIds: UniqueIdentifier[]
}

export default function TabContent<T extends { id: string | number }>({
  table,
  sensors,
  sortableId,
  dataIds,
  tabValue
}: TabContentProps<T>) {

  const { reorderEmployees } = useContext(EmployeeContext)
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id)
      const newIndex = dataIds.indexOf(over.id)
      reorderEmployees(oldIndex, newIndex)
    }
  }

  return (
    <TabsContent value={tabValue} className="relative flex flex-col h-full gap-4 overflow-auto px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border h-full">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map(row => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <TableFooter table={table}/>
    </TabsContent>
  )
}
