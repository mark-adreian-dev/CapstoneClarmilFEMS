import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { AuthContext } from "@/context/AuthContext/AuthContext"
import { useContext } from "react"
import { UserRole, type User } from "@/types/User"

export function SiteHeader() {
  const { user } = useContext(AuthContext)
 
  const userData: (User & { avatar: string }) | undefined = user
    ? { ...user, avatar: "/avatars/shadcn.jpg" }
    : undefined;
  
  const Role =
    userData?.role === UserRole.MEASURING ? "Measuring Staff" :
    userData?.role === UserRole.RECIEVER ? "Processing Staff" :
    userData?.role === UserRole.MANAGER ? "Manager":
    userData?.role === UserRole.ADMIN ? "Administrator" : ""

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{Role}</h1>
        <div className="ml-auto flex items-center gap-2">
          <NavUser user={userData} />

        </div>
      </div>
    </header>
  )
}
