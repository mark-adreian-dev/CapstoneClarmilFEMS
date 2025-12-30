import { Button } from "@/components/ui/button";
import { type Icon } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";

interface TableActionButtonProps {
  title: string
  Icon: Icon,
}

export default function TableActionButton({ title, Icon, ...props }: ComponentPropsWithoutRef<typeof Button> &  TableActionButtonProps) {
  return (
    <Button {...props} variant="outline" size="sm" className={`cursor-pointer hover:bg-white! hover:text-primary-foreground ${props.className}`}>
      <Icon />
      <span className="hidden lg:inline">{title}</span>
    </Button>
  )
}
