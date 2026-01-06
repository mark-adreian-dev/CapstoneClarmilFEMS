export interface Ingridient {
  id: number
  name: string
  type: IngridientType
  image_path: string
  stock_quantity: number
  reorder_level: number
  unit: string
  unit_cost: number
  expiration_date: Date
  description: string
  created_at: Date
  updated_at: Date
}

export enum IngridientType {
  BASE = "base",
  ADDITIONAL = "additional"
}

export type IngridientFormType = Partial<Ingridient>

export enum IngridientsCategory {
  ALL = "All",
  BASE = "Base",
  ADDITIONAL = "Additional"
}