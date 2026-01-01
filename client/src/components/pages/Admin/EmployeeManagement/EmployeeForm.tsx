import { IconEdit, IconUserPlus } from "@tabler/icons-react";
import { FieldGroup } from "@/components/ui/field"
import { useContext, useMemo } from "react";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";
import FormInput from "@/components/global/Form/FormFields/FormInput";
import FormDateSelector from "@/components/global/Form/FormFields/FormDateSelector";
import FormRadioButton from "@/components/global/Form/FormFields/FormRadioButton";
import type { RadioOption } from "@/types/ComponentTypes/RadioButton";
import FormSelect from "@/components/global/Form/FormFields/FormSelect";
import type { SelectOption } from "@/types/ComponentTypes/Select";
import FormTextArea from "@/components/global/Form/FormFields/FormTextArea";
import Form from "@/components/global/Form";
import { addEmplyoeesDefaultValues, formSchema } from "./Form/FormSchema";
import { Sex, UserRole, type UserFormType } from "@/types/User";
import { FormType } from "@/types/ComponentTypes/Form";

interface EmployeeFormProps {
  type: FormType
  targetID?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function EmployeeForm({ type, targetID, open, onOpenChange }: EmployeeFormProps) {
  const { addEmployee, updateEmployee, employees } = useContext(EmployeeContext)

  const targetEmployee = useMemo(() => {
    if(!targetID) return 
    return employees?.find(emp => emp.id === targetID) || null;
  }, [employees, targetID]);

  const employeeDetails = useMemo(() => {
    if (!targetEmployee) return addEmplyoeesDefaultValues;
    return {
      first_name: targetEmployee.first_name ?? "",
      last_name: targetEmployee.last_name ?? "",
      middle_name: targetEmployee.middle_name ?? "",
      suffix: targetEmployee.suffix ?? "",
      email: targetEmployee.email ?? "",
      contact_number: targetEmployee.contact_number ?? "",
      address: targetEmployee.address ?? "",
      sex: (targetEmployee.sex as Sex) ?? Sex.MALE,
      // Convert string from API to Date object for the form
      birthdate: targetEmployee.birthdate ? new Date(targetEmployee.birthdate) : null,
      role: (targetEmployee.role as UserRole) ?? null,
    };
  }, [targetEmployee]);

  const sexOption: RadioOption[] = [
    {
      label: "Male",
      value: "male"
    },
    {
      label: "Female",
      value: "female"
    }
  ]

  const roleOption: SelectOption[] = [
    {
      label: "Preparation Staff",
      value: "measuring_worker"
    },
    {
      label: "Processing Staff",
      value: "receiving_worker"
    },
    {
      label: "Manager",
      value: "manager"
    },
    {
      label: "Administrator",
      value: "admin"
    }
  ]

  const handleSubmit = async (values: UserFormType) => {
    if (type === FormType.EDIT && targetID) {
      await updateEmployee(values, targetID);
    } else {
      await addEmployee(values);
    }
  };

  const addEmployeeDescription = "Enter the details of the new staff member. Fields marked with an asterisk (*) are required to initialize the employee profile."
  const editEmployeeDesctiption = "Modify the employee details below. Changes will be updated across the system once saved"

  return (
    <Form
      formSchema={formSchema}
      defaultValues={employeeDetails}
      onSubmit={handleSubmit}
      formType={type}
      title={type === FormType.ADD ? "Add Employee" : "Edit Employee"}
      description={type === FormType.ADD ? addEmployeeDescription : editEmployeeDesctiption}
      triggerTitle={type === FormType.ADD ? "Add Employee" : "Edit"}
      triggerIcon={type === FormType.ADD ? IconUserPlus : IconEdit}
      onOpenChange={onOpenChange}
      open={open}
      >
      {
        (form) => (

          <FieldGroup className="mb-10">
            <div className="flex flex-col gap-2">
              <FormInput form={form} name={"first_name"} label={"First name"} required />
              <FormInput form={form} name={"middle_name"} label={"Middle name (Optional)"}  />
              <FormInput form={form} name={"last_name"} label={"Last name"} required />
            </div>
            <div className="flex gap-2">
              <FormInput form={form} name={"suffix"} label={"Suffix (Optional)"} />
              <FormDateSelector form={form} name={"birthdate"} label={"Birthdate"} required />
              <FormRadioButton form={form} name={"sex"} label={"Sex"} options={sexOption} required />

            </div>
            <div className="flex flex-col gap-2">
              <FormInput form={form} name={"email"} label={"Email"} />
              <FormInput form={form} name={"contact_number"} label={"Contact No."} />
              <FormSelect form={form} name={"role"} label={"Role"} options={roleOption} required />

            </div>
            <div className="flex gap-2 sm:flex-col lg:flex-row">
              <FormTextArea form={form} name={"address"} label={"Home Address"} height={50} required />
            </div>
          </FieldGroup>
        )
      }
    </Form>
  )
}

