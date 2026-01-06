import { IconBuildingPlus, IconEdit } from "@tabler/icons-react";
import { FieldGroup } from "@/components/ui/field"
import { useContext, useMemo } from "react";
import Form from "@/components/global/Form";
import { FormType } from "@/types/ComponentTypes/Form";
import { StationType, type StationFormType } from "@/types/Station";
import { StationContext } from "@/context/StationContext/StationContext";
import { addStationDefaultValues, formSchema } from "./Form/FormSchema";
import FormInput from "@/components/global/Form/FormFields/FormInput";
import FormRadioButton from "@/components/global/Form/FormFields/FormRadioButton";
import type { RadioOption } from "@/types/ComponentTypes/RadioButton";
import FormTextArea from "@/components/global/Form/FormFields/FormTextArea";

interface StationFormProps {
  type: FormType
  targetID?: number
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StationForm({ type, targetID, open, onOpenChange }: StationFormProps) {
  const { addStation, updateStation, stations } = useContext(StationContext)

  const targetStation = useMemo(() => {
    if(!targetID) return 
    return stations?.find(emp => emp.id === targetID) || null;
  }, [stations, targetID]);

  const stationDetails = useMemo(() => {
    if (!targetStation) return addStationDefaultValues;
    return {
      name: targetStation.name ?? "",
      type: targetStation.type ?? null,
      description: targetStation.description ?? ""
    };
  }, [targetStation]);


  const handleSubmit = async (values: StationFormType) => {
    if (type === FormType.EDIT && targetID) {
      await updateStation(targetID, values);
    } else {     
      await addStation(values);
    }
  };

  const addStationDescription = "Enter the details of the new staff member. Fields marked with an asterisk (*) are required to initialize the station profile."
  const editStationDesctiption = "Modify the station details below. Changes will be updated across the system once saved"

  const stationOption: RadioOption[] = [
    {
      label: "Preparation Station",
      value: StationType.PREPARATION
    },
    {
      label: "Processing Station",
      value: StationType.PROCESSING
    }
  ]
  return (
    <Form
      formSchema={formSchema}
      defaultValues={stationDetails}
      onSubmit={handleSubmit}
      formType={type}
      title={type === FormType.ADD ? "Add Station" : "Edit Station"}
      description={type === FormType.ADD ? addStationDescription : editStationDesctiption}
      triggerTitle={type === FormType.ADD ? "Add Station" : "Edit"}
      triggerIcon={type === FormType.ADD ? IconBuildingPlus : IconEdit}
      submitIcon={IconBuildingPlus}
      open={open}
      onOpenChange={onOpenChange}
      >
      {
        (form) => (

          <FieldGroup className="mb-10">
            <div className="flex flex-col  gap-4 lg:flex-row">
              <FormInput form={form} name={"name"} label={"Station Name"} className="w-full!" required />
              <FormRadioButton form={form} name={"type"} label={"Station Type"} className="w-full" options={stationOption} required/>
            </div>
            <div>
              <FormTextArea form={form} name={"description"} label={"Description"} className="h-40" />
            </div>
          </FieldGroup>
        )
      }
    </Form>
  )
}

