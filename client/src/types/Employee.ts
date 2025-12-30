import type { User } from "./User"

export interface Employee extends User {
  station?: Station
}

export interface Station {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}
