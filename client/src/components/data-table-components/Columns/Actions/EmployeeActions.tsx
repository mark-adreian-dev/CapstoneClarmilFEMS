import { useState } from "react";
import DeleteEmployeeDialog from "@/components/pages/Admin/EmployeeManagement/DeleteEmployeeDialog";
import EmployeeForm from "@/components/pages/Admin/EmployeeManagement/EmployeeForm";
import ShowPasswordDialog from "@/components/pages/Admin/EmployeeManagement/ShowPasswordDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FormType } from "@/types/ComponentTypes/Form";
import type { Employee } from "@/types/Employee";
import { IconDotsVertical } from "@tabler/icons-react";
import type { Row } from "@tanstack/react-table";

export const EmployeeActions = ({ row }: { row: Row<Employee> }) => {
  // 1. Manage independent state for each dialog
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
          {/* 2. Menu items trigger state change and close menu naturally */}
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
            Edit Details
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setIsPasswordOpen(true)}>
            Show Password
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Delete Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 3. Render Dialogs outside the DropdownMenu hierarchy */}
      {isEditOpen && (
        <EmployeeForm
          targetID={row.original.id}
          type={FormType.EDIT}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isPasswordOpen && (
        <ShowPasswordDialog
          password={row.original.plain_password}
          open={isPasswordOpen}
          onOpenChange={setIsPasswordOpen}
        />
      )}

      {isDeleteOpen && (
        <DeleteEmployeeDialog
          id={row.original.id}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
        />
      )}
    </>
  );
};