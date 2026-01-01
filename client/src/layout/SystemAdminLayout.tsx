
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
// import data from "./data.json"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { IconSettings, IconHelp, IconSearch, IconDatabase, IconReport, IconFileWord, IconLayout, IconUserCircle, IconBuilding, IconFileBarcode } from "@tabler/icons-react"
import type { AppSideBar } from "@/types/ComponentTypes/AppSideBar"
import { Outlet } from "react-router-dom"


const AppSideBarData: AppSideBar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconLayout,
    },
    
    {
      title: "Employees",
      url: "/admin/users",
      icon: IconUserCircle,
    }, 
    {
      title: "Inventory",
      url: "/admin/ingridients",
      icon: IconDatabase,
    },
    {
      title: "Station",
      url: "/admin/stations",
      icon: IconBuilding,
    },
    {
      title: "Report",
      url: "/admin/report",
      icon: IconFileBarcode,
    },
    
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export default function SystemAdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" data={AppSideBarData} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
