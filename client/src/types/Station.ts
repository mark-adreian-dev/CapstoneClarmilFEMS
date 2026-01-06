export interface Station {
  id: number
  name: string
  description: string
  type: StationType
  manager_id: number | null
  created_at: Date
  updated_at: Date
}

export enum StationType {
  PREPARATION = "preparation",
  PROCESSING = "processing"
}

export type StationFormType = Partial<Station>

export enum StationsCategory {
  ALL = "All",
  PREPARATION = "Preparation",
  PROCESSING = "Processing"
}

export enum StationEmployeeCategory {
  ALL = "All"
}