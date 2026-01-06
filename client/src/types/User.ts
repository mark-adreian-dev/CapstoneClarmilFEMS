export interface User {
  id: number
  employee_id: string
  first_name: string
  last_name?: string
  middle_name?: string
  suffix?: string
  email: string
  birthdate: string | null
  role: UserRole | null
  sex: Sex
  address?: string
  contact_number?: string
  plain_password: string
  station_id: number | null
  created_at: Date
  updated_at: Date
}

export type UserFormType = Omit<Partial<User>, 'birthdate'> & {
  birthdate: Date | null;
}

export enum Sex {
  MALE = "male",
  FEMALE = "female"
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