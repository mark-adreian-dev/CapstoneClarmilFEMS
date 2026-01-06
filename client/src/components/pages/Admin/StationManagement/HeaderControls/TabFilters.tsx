import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { StationPageContext } from "@/pages/Admin/AdminStationPage"
import { StationsCategory } from "@/types/Station"
import { useContext, type ReactNode } from "react"

interface StationTabFiltersProps {
  children: ReactNode
}

export function StationTabFilters({ children }: StationTabFiltersProps) {
  const { activeTab, setActiveTab, query } = useContext(StationPageContext)
  const options = [
    {
      value: StationsCategory.ALL,
      label: StationsCategory.ALL
    },
    {
      value: StationsCategory.PREPARATION,
      label: StationsCategory.PREPARATION
    },
    {
      value: StationsCategory.PROCESSING,
      label: StationsCategory.PROCESSING
    },

  ]
  return (
    <div className="flex w-full flex-col">
      <Tabs defaultValue={activeTab}>
        <div className="w-full flex justify-between items-center px-4">
          <TabsList>
            {
              options.map(option => {
                return (
                  <TabsTrigger key={option.value} value={option.value} onClick={() => setActiveTab(option.value)}>{option.label}</TabsTrigger>
                )
              })
            }
          </TabsList>
          {
            query && <p className="text-sm italic text-muted-foreground">results for "{query}" </p>
          }
        </div>
        
        {children}
      </Tabs>
      
    </div>
  )
}
