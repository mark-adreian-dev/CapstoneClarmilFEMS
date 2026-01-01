import { Sex, UserRole } from "@/types/User";
import z from "zod";

export const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string(),
  suffix: z.string(),
  sex: z.enum([Sex.FEMALE, Sex.MALE]),
  address: z.string().refine((val) => val !== "", "Address is required"),
  contact_number:
    z.string()
      .min(11, "Contact No. must be exactly 11 digit code")
      .max(11, "Contact No. must be exactly 11 digit code")
      .regex(/^09\d{9}$/, "Contact No. must start with '09' followed by 9 digits"),
  role: z
    .enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.MEASURING, UserRole.RECIEVER]).nullable()
    .refine((val) => val !== null, "Role is required"),
  birthdate: z
    .date()
    .nullable() // Allows the initial null state
    .refine((val) => val !== null, "Birthday is required"),
  email: z.email(),
});

export const addEmplyoeesDefaultValues = {
  first_name: "",
  last_name: "",
  middle_name: "",
  suffix: "",
  email: "",
  contact_number: "",
  address: "",
  sex: Sex.MALE,
  birthdate: null,
  role: null as UserRole | null,
}