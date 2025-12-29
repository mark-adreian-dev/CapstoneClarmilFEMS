import type { Icon } from "@tabler/icons-react"

export interface AppSideBar {
  navMain: NavMain[]
  navSecondary: NavSecondary[]
  documents: Document[]
}

export interface User {
  name: string
  email: string
  avatar: string
}

export interface NavMain {
  title: string
  url: string
  icon: Icon
}

export interface NavCloud {
  title: string
  icon: Icon
  isActive?: boolean
  url: string
  items: Item[]
}

export interface Item {
  title: string
  url: string
}

export interface NavSecondary {
  title: string
  url: string
  icon: Icon
}

export interface Document {
  name: string
  url: string
  icon: Icon
}
