import { z } from "zod";
import { IngridientType, type Ingridient } from "@/types/Ingridients";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  type: z.enum([IngridientType.BASE, IngridientType.ADDITIONAL]),
  image_path: z.union([
    z.instanceof(File),
    z.string()
  ]).optional(),
    
  stock_quantity: z.coerce.number({ message: "Stock is Required "}).min(0, "Stock must be 0 or more"),
  reorder_level: z.coerce.number({ message: "Stock is Required " }).min(0, "Reorder level must be 0 or more"), 
  unit: z.string().min(1, "Unit is required"),
  unit_cost: z.coerce.number().min(0, "Cost must be 0 or more").optional(),
  expiration_date: z.date().optional().or(z.undefined()),
  description: z.string().min(20, "Description must be atleast 20 characters.").max(1000, "Description is too long"),
});

export const addIngredientDefaultValues: Partial<Ingridient> = {
  name: "",
  type: undefined,
  image_path: undefined,
  stock_quantity: 0,
  reorder_level: 0,
  unit: "",
  unit_cost: 0,
  expiration_date: undefined,
  description: "",
};