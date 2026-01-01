import SearchStation from "./HeaderControls/SearchStation"

interface HeaderControlsProps{
  query: string
  setQuery: (query: string) => void
}

export default function HeaderControls({ query, setQuery }: HeaderControlsProps) {
  return (
    <div>
      <SearchStation query={query} setQuery={setQuery}/>
    </div>
  )
}
