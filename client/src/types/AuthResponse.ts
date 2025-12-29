import type { UserRole } from "./User";

export interface AuthSuccess {
  message: string,
  role: UserRole
}

export interface AuthError {
  message: string
}