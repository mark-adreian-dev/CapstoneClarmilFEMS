import type { ReactNode } from "react"
import SearchStation from "./HeaderControls/SearchStation"
import { StationTabFilters } from "./HeaderControls/TabFilters"
import StationForm from "./StationForm"
import { FormType } from "@/types/ComponentTypes/Form"

interface HeaderControlsProps {
  children: ReactNode
}

export default function HeaderControls({ children }: HeaderControlsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-20 px-4 w-full">
        <SearchStation />
        <StationForm type={FormType.ADD} />
      </div>
     
      <StationTabFilters>
        {children}
      </StationTabFilters>
    </div>
  )
}
