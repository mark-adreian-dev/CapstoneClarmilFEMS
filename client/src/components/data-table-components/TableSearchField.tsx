import { IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import type { Table } from "@tanstack/react-table";


interface TableSearchFieldProps<TData extends object> {
  placeholder: string 
  table: Table<TData>
  searchColumn: Extract<keyof TData, string>;
}

export default function TableSearchField<TData extends object>({ placeholder, table, searchColumn }: TableSearchFieldProps<TData>) {
  return (
    <div className="flex items-center min-w-full w-full gap-4 mb-4">
      <IconSearch />
      <Input
        placeholder={placeholder}
        value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(searchColumn)?.setFilterValue(event.target.value)
        }
        
      />
    </div>
  )
}
