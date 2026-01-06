import type { User } from "./User"

export interface Employee extends User  {
  assigned_station: Station | null
  managed_stations: Station[]
}

export interface Station {
  id: number
  name: string
  description: string
  created_at: Date
  updated_at: Date
}

export enum EmployeeCategory {
  ALL = "All",
  MEASURING = "Preparation Staff",
  RECIEVER = "Processing Staff",
  MANAGER = "Manager",
  ADMIN = "Administrator"
}
