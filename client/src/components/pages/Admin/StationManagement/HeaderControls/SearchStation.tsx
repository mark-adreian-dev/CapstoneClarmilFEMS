import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

interface SearchStationProps {
  query: string
  setQuery: (query: string) => void
}

export default function SearchStation({ query, setQuery } : SearchStationProps) {
  return (
    <div className="flex items-center min-w-full w-full gap-4 mb-4">
      <IconSearch />
      <Input
        placeholder={"Search stations..."}
        value={query}
        onChange={(e) => {setQuery(e.target.value)}}
      />
    </div>
  )
}
