
import { TabsContent } from "@/components/ui/tabs"
import { StationsCategory, StationType, type Station } from "@/types/Station"
import { useMemo } from "react";
import StationCard from "./TabContent/StationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
interface TabContentProps {
  value: StationsCategory
  stationsData: Station[]
  query: string
}

export default function StationTabContent({ value, query, stationsData }: TabContentProps) {
  const filteredStations = useMemo(() => {
    let result = [...stationsData];

    if (value === StationsCategory.PREPARATION) {
      result = result.filter(station => station.type === StationType.PREPARATION)
    }

    if (value === StationsCategory.PROCESSING) {
      result = result.filter(station => station.type === StationType.PROCESSING)
    }

    if (query) {
      result = result
        .filter(station => station.name.toLowerCase().includes(query.toLowerCase()))
    }

    return result;
  }, [stationsData, value, query]);



  return (
    <TabsContent value={value}>
      <span className="block text-sm italic px-4 mb-5">{filteredStations.length} items found</span>
      <ScrollArea className="h-128 pr-3">
      <div className="p-4!  *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {
            filteredStations.map(station => {
              return (
                <Link to={`/admin/stations/${station.id}`} key={station.id} >
                  <StationCard
                   
                    type={station.type}
                    name={station.name}
                    manager_id={station.manager_id}
                    description={station.description}
                    stationID={station.id}
                  />
                </Link>
                
              )
            })
          }
        </div>
      </ScrollArea>
    </TabsContent>   
  )
}
