import { z } from "zod";
import { StationType, type StationFormType } from "@/types/Station";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  type: z.enum([StationType.PREPARATION, StationType.PROCESSING]),
  description: z.string().min(1, "Description is requried").max(20, "Description exceeds character constraints")
});

export const addStationDefaultValues: StationFormType = {
  name: "",
  description: "",
  type: StationType.PREPARATION,
};