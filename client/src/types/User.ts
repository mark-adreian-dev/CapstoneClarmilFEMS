export interface User {
  id: number
  employee_id: string
  name: string
  email: string
  role: UserRole
  department_id: number
  created_at: string
  updated_at: string
}

export enum UserRole {
  MEASURING = "measuring_worker",
  RECIEVER = "receiving_worker",
  MANAGER = "manager",
  ADMIN = "admin"
}

export enum UserContextRole {
  WORKER = "worker",
  ADMIN = "admin",
  MANAGER = "manager"
}