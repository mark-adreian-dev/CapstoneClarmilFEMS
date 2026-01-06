import { IconEdit, IconPlus } from "@tabler/icons-react";
import { FieldGroup } from "@/components/ui/field"
import { useContext, useMemo } from "react";
import FormInput from "@/components/global/Form/FormFields/FormInput";
import FormDateSelector from "@/components/global/Form/FormFields/FormDateSelector";
import FormRadioButton from "@/components/global/Form/FormFields/FormRadioButton";
import type { RadioOption } from "@/types/ComponentTypes/RadioButton";
import FormSelect from "@/components/global/Form/FormFields/FormSelect";
import type { SelectOption } from "@/types/ComponentTypes/Select";
import FormTextArea from "@/components/global/Form/FormFields/FormTextArea";
import Form from "@/components/global/Form";

import { FormType } from "@/types/ComponentTypes/Form";
import { IngridientContext } from "@/context/IngridientsContext/IngridientsContext";
import { addIngridientDefaultValues, formSchema } from "./Form/FormSchema";
import type { IngridientFormType } from "@/types/Ingridient";
import FormNumberInput from "@/components/global/Form/FormFields/FormNumberInput";
import FormImageInput from "@/components/global/Form/FormFields/FormImageInput";

interface IngridientFormProps {
  type: FormType
  targetID?: number
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function IngridientForm({ type, targetID, open, onOpenChange }: IngridientFormProps) {
  const { addIngridient, updateIngridient, ingridients } = useContext(IngridientContext)

  const targetIngridient = useMemo(() => {
    if(!targetID) return 
    return ingridients?.find(emp => emp.id === targetID) || null;
  }, [ingridients, targetID]);

  const ingridientDetails = useMemo(() => {
    if (!targetIngridient) return addIngridientDefaultValues;
    return {
      name: targetIngridient.name ?? "",
      type: targetIngridient.type ?? null,
      image_path: targetIngridient.image_path ?? undefined,
      stock_quantity: targetIngridient.stock_quantity ?? 0,
      reorder_level: targetIngridient.reorder_level ?? 0,
      unit: targetIngridient.unit ?? "",
      unit_cost: targetIngridient.unit_cost ?? 0,
      expiration_date: targetIngridient.expiration_date ? new Date(targetIngridient.expiration_date) : undefined,
      description: targetIngridient.description ?? "",
    };
  }, [targetIngridient]);

  const ingridientTypeOption: RadioOption[] = [
    {
      label: "Base Ingridient",
      value: "base"
    },
    {
      label: "Additional Ingridient",
      value: "additional"
    }
  ]

  const unitOption: SelectOption[] = [
    // Metric Units (Most Common)
    { label: "Grams (g)", value: "g" },
    { label: "Kilograms (kg)", value: "kg" },
    { label: "Milligrams (mg)", value: "mg" },

    // Imperial/US Units
    { label: "Ounces (oz)", value: "oz" },
    { label: "Pounds (lb)", value: "lb" },

    // Volumetric (Common for small dry spices/baking)
    { label: "Teaspoon (tsp)", value: "tsp" },
    { label: "Tablespoon (tbsp)", value: "tbsp" },
    { label: "Cup (cup)", value: "cup" },

    // Bulk / Packaging Units
    { label: "Sack (sk)", value: "sack" },
    { label: "Bag (bg)", value: "bag" },
    { label: "Box (bx)", value: "box" },
    { label: "Piece (pc)", value: "pc" }
  ];

  const handleSubmit = async (values: IngridientFormType) => {
    if (type === FormType.EDIT && targetID) {
      await updateIngridient(targetID, values);
    } else {     
      await addIngridient(values);
    }
  };

  const addIngridientDescription = "Enter the details of the new staff member. Fields marked with an asterisk (*) are required to initialize the ingridient profile."
  const editIngridientDesctiption = "Modify the ingridient details below. Changes will be updated across the system once saved"

  return (
    <Form
      formSchema={formSchema}
      defaultValues={ingridientDetails}
      onSubmit={handleSubmit}
      formType={type}
      title={type === FormType.ADD ? "Add Ingridient" : "Edit Ingridient"}
      description={type === FormType.ADD ? addIngridientDescription : editIngridientDesctiption}
      triggerTitle={type === FormType.ADD ? "Add Ingridient" : "Edit"}
      triggerIcon={type === FormType.ADD ? IconPlus : IconEdit}
      submitIcon={IconPlus}
      open={open}
      onOpenChange={onOpenChange}
      >
      {
        (form) => (

          <FieldGroup className="mb-10">
            <div className="flex  gap-2">
              <FormInput form={form} name={"name"} label={"Ingridient Name:"} required/>
              <FormRadioButton form={form} name={"type"} label={"Ingridient Type"} options={ingridientTypeOption} className="w-[50%]" required />
            
              {/* <FormInput form={form} name={"last_name"} label={"Last name"} required /> */}
            </div>
            <div className="flex gap-2">
              <FormTextArea className="h-full" form={form} name={"description"} label={"Description"} height={50} required />

              <div className="flex flex-col gap-2 w-[50%]">
                <FormNumberInput className="" form={form} name={"stock_quantity"} label={"Quantity"} required/>
                <FormNumberInput className="" form={form} name={"reorder_level"} label={"Reorder Point"} required/>
                <FormNumberInput className="" form={form} name={"unit_cost"} label={"Unit Cost (P)"} required/>
                <FormSelect form={form} name={"unit"} label={"Unit"} options={unitOption} required />
                <FormDateSelector form={form} name={"expiration_date"} label={"Expiration (Optional)"} />
              </div>
              {/* <FormInput form={form} name={"suffix"} label={"Suffix (Optional)"} />
              <FormDateSelector form={form} name={"birthdate"} label={"Birthdate"} required />
              <FormRadioButton form={form} name={"sex"} label={"Sex"} options={sexOption} required /> */}

            </div>
            <div className="flex flex-col gap-2">
                <FormImageInput className="h-50" form={form} name={"image_path"} label={"Image"} />
              {/* <FormInput form={form} name={"email"} label={"Email"} />
              <FormInput form={form} name={"contact_number"} label={"Contact No."} />
              <FormSelect form={form} name={"role"} label={"Role"} options={roleOption} required /> */}

            </div>
            <div className="flex gap-2 sm:flex-col lg:flex-row">
              
            </div>
          </FieldGroup>
        )
      }
    </Form>
  )
}

