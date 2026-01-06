import DeleteIngridientDialog from "@/components/pages/Admin/InventoryManagement/DeleteIngridientDialog";
import IngridientForm from "@/components/pages/Admin/InventoryManagement/IngridientForm";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FormType } from "@/types/ComponentTypes/Form";
import type { Ingridient } from "@/types/Ingridient";
import { IconDotsVertical } from "@tabler/icons-react";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";

export const IngridientActions = ({ row }: { row: Row<Ingridient> }) => {
  // 1. Manage visibility with state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteOpen] = useState(false);

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
          {/* 2. Menu items just trigger state, no nested components here */}
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 3. Render forms OUTSIDE the menu tree */}
      {isEditDialogOpen && (
        <IngridientForm
          type={FormType.EDIT}
          targetID={row.original.id}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteIngridientDialog
          id={row.original.id}
          // Assuming DeleteEmployeeDialog also supports controlled open
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteOpen}
        />
      )}
    </>
  );
};