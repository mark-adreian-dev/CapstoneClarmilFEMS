import { Theme } from "@/types/Theme"
import { createContext } from "react"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: Theme.SYSTEM,
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
