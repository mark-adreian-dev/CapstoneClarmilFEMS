import { UserRole } from "@/types/User";

export const employeeCategory: Record<UserRole, string> = {
  [UserRole.MEASURING]: "Preparation Staff",
  [UserRole.RECIEVER]: "Processing Staff",
  [UserRole.MANAGER]: "Manager",
  [UserRole.ADMIN]: "Administrator",
}
