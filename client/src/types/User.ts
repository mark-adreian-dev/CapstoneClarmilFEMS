export interface User {
  id: number
  employee_id: string
  first_name: string
  last_name?: string
  middle_name?: string
  suffix?: string
  email: string
  birthdate: string | null
  role: UserRole
  sex: Sex
  address?: string
  contact_number?: string
  plain_password: string
  created_at: string
  updated_at: string
}


//CRUD
export interface UserFormType {
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  sex: Sex; 
  address: string;
  contact_number: string;
  role: UserRole | null; 
  birthdate: string | null;
  email: string;
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