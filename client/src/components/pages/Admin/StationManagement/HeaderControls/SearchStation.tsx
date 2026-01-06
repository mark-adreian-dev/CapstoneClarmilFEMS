import { Input } from "@/components/ui/input";
import { StationPageContext } from "@/pages/Admin/AdminStationPage";
import { IconSearch } from "@tabler/icons-react";
import { useContext } from "react";

export default function SearchStation() {
  const { query, setQuery } = useContext(StationPageContext)
  return (
    <div className="flex items-center w-full max-w-[400px] gap-4">
      <IconSearch />
      <Input
        placeholder={"Search stations..."}
        value={query}
        onChange={(e) => {setQuery(e.target.value)}}
      />
    </div>
  )
}
