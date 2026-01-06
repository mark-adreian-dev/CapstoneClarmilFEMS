import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Employee } from "@/types/Employee";
import { IconDotsVertical } from "@tabler/icons-react";
import type { Row } from "@tanstack/react-table";
import Dialog from "@/components/global/Dialog";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";
import type { UserFormType } from "@/types/User";
export const StationEmployeeActions = ({ row }: { row: Row<Employee> }) => {
  const { updateEmployee } = useContext(EmployeeContext)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleUnAssign = async (id: number, payload: UserFormType) => {
    await updateEmployee(payload, id)
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          {/* 1. Use onSelect to open the dialog and prevent the menu from closing prematurely */}
          <DropdownMenuItem 
            className="text-red-400 hover:bg-red-500/10 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault(); // Prevents the dropdown from closing immediately
              setIsDeleteOpen(true);
            }}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 2. Move the Dialog OUTSIDE the DropdownMenuContent */}
      <Dialog
        TriggerComponent={undefined} // No trigger needed because we use isDeleteOpen
        title="Remove Employee"
        description={`Are you sure you want to remove ${row.original.first_name} from this station?`}
        actionLabel="Remove"
        actionButtonColorClassname="bg-red-500! text-primary"
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        action={() => {
          const payload: UserFormType = {
            station_id: undefined,
            birthdate: row.original.birthdate as Date | null
          }

       
          handleUnAssign(row.original.id, payload)
        }} 
      />
    </>
  );
};