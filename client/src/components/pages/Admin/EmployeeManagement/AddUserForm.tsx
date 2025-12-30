import TableActionButton from "@/components/data-table-components/TabFilterComponents/TableActionButton";
import { IconCake, IconGenderBigender, IconHome2, IconLockAccess, IconMail, IconPhone, IconPlus, IconUserPlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ChevronDownIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import * as z from "zod"
import { Input } from "@/components/ui/input";
import { useContext, useState, type SyntheticEvent } from "react";
import { Sex, UserRole } from "@/types/User";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { employeeCategory } from "@/utils/UserRolesList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeContext } from "@/context/EmployeeContext/EmployeeContext";
import { format } from "date-fns";
import CustomDialog from "@/components/global/Dialog";


const formSchema = z.object({
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

export default function AddUserForm() {
  const { addEmployee } = useContext(EmployeeContext)
  
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      suffix: "",
      email: "",
      contact_number: "",
      address: "",
      sex: Sex.MALE,
      birthdate: null as Date | null,
      role: null as UserRole | null,
    },
    validators: {
     
      onSubmit: formSchema,
      onChange: formSchema,
         
    },
    onSubmitInvalid(props) {
      console.error("Form is invalid!", props.value);
    },

    onSubmit: async ({ value }) => {
      const employeeDetails = {
        ...value,
        birthdate: value.birthdate
          ? format(value.birthdate, "yyyy-MM-dd")
          : null,
      };
      await addEmployee(employeeDetails);
      form.reset({
        first_name: "",
        last_name: "",
        middle_name: "",
        suffix: "",
        email: "",
        contact_number: "",
        address: "",  
        sex: Sex.MALE,
        birthdate: null as Date | null,
        role: null as UserRole | null,
      })

    },
  });

  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const formSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault()

    form.handleSubmit()
    setDialogOpen(false)
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <TableActionButton Icon={IconPlus} title="Add Employee" type="button"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 md:max-w-1/2 border-primary/30">
  
      <form onSubmit={formSubmit}>
        <DialogHeader className="mb-10">
          <DialogTitle className="text-2xl font-black">Add Employee</DialogTitle>
          <DialogDescription>
            Fill out the information below to add a new employee. Click save when you're done.
          </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-100 mb-5 pr-4">
            <FieldGroup className="mb-10">
              <div className="flex flex-col gap-2">
                <form.Field
                  name="first_name"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>First name:<span className="text-red-500">*</span></FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          aria-invalid={isInvalid}
                          placeholder="First name"
                          autoComplete="off"

                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="middle_name"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Middle name (Optional):</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          aria-invalid={isInvalid}
                          placeholder="Middle name"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="last_name"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Last name:<span className="text-red-500">*</span></FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          aria-invalid={isInvalid}
                          placeholder="Last name"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
              <div className="flex gap-2">
                <form.Field
                  name="suffix"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Suffix (Optional):</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          aria-invalid={isInvalid}
                          placeholder="Suffix"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="birthdate"
                  validators={{
                    onChange: formSchema.shape.birthdate,
                  }}
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          <IconCake className="w-4 h-4" />
                          <p>Birthdate: </p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="flex flex-col gap-3">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id={field.name}
                                className="w-full justify-between font-normal"
                              >
                                {field.state.value ? field.state.value.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.state.value ?? undefined}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.handleChange(date ?? null)
                                  setOpen(false)
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="sex"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid} className="w-[40%]">
                        <FieldLabel htmlFor={field.name}>
                          <IconGenderBigender className="w-4 h-4" />
                          <p>Sex: </p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <RadioGroup
                          onValueChange={(value) => field.handleChange(value as Sex)}
                          value={field.state.value ?? ""}
                          onBlur={field.handleBlur}
                          className="flex items-center h-full gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value={Sex.MALE} id="male" />
                            <Label htmlFor="male" className="font-normal">Male</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value={Sex.FEMALE} id="female" />
                            <Label htmlFor="female" className="font-normal">Female</Label>
                          </div>
                        </RadioGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid} className="min-w-[60%]">
                        <FieldLabel htmlFor={field.name}>
                          <IconMail className="w-4 h-4" />
                          <p>Email: </p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Email Address"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="contact_number"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          <IconPhone className="w-4 h-4" />
                          <p>Contact No.</p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Contact No."
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="role"
                  validators={{
                    onChange: formSchema.shape.role,
                  }}
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          <IconLockAccess className="w-4 h-4" />
                          <p>Role: </p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Select value={field.state.value ?? ""} onValueChange={(value) => field.handleChange(value as UserRole)}>
                          <SelectTrigger
                            onBlur={field.handleBlur}
                          >
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Roles</SelectLabel>
                              {Object.values(UserRole).map((roleValue) => (
                                <SelectItem key={roleValue} value={roleValue}>
                                  {employeeCategory[roleValue as UserRole]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
              <div className="flex gap-2 sm:flex-col lg:flex-row">
                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid} className="min-w-4/6">
                        <FieldLabel htmlFor={field.name}>
                          <IconHome2 className="w-4 h-4" />
                          <p>Home Address: </p>
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onKeyDown={(e) => e.stopPropagation()}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Home Address"
                          autoComplete="off"
                          className="h-50"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
            </FieldGroup>
          </ScrollArea>
       
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
              <form.Subscribe selector={(state) => [state.canSubmit, state.isDirty]}>
                {([canSubmit, isDirty]) => (
                  
                <CustomDialog
                  TriggerComponent={
                    <Button type="button" disabled={!canSubmit || !isDirty}>
                      {form.state.isSubmitting ?
                        <p>Saving...</p>
                        :
                        <>
                          <IconUserPlus />
                          <p>Add Employee</p>
                        </>}
                    </Button>
                  }
                  title={"Add Employee"}
                  description={"Are you sure that the specified details is correct and true?"}
                  actionLabel="Save"
                  actionButtonColorClassname="bg-primary text-primary-foreground"
                  action={formSubmit}
                />
              )}
            </form.Subscribe>     
          </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>  
  )
}

