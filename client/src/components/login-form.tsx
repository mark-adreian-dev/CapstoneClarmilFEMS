import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Lock, UserCircle2 } from "lucide-react"
import { useContext, useState, type ChangeEvent, type FormEvent } from "react"
import { AuthContext } from "@/context/AuthContext/AuthContext"
import { UserContextRole } from "@/types/User"
import { Badge } from "./ui/badge"

export function LoginForm({
  className,
  context,
  ...props
}: React.ComponentProps<"form"> & { context: UserContextRole}) {
  const { authLoading, login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    employee_id: "",
    password: "",
    context: context
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value 
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(formData.employee_id, formData.password, formData.context)
  }


  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={(e) => handleSubmit(e)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <Badge className="mb-2">
            {
              context === UserContextRole.WORKER ? "Staff Login" :
              context === UserContextRole.MANAGER ? "Manager Login"
              : "Admin Login"
            } 
          </Badge>
          <h1 className="text-2xl w-175 font-bold">Login to your {context === UserContextRole.WORKER ? "Worker" : context === UserContextRole.MANAGER ? "Manager" : "Admin"} Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your account below to login
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="employee_id">
            <UserCircle2 className="w-4"/>
            <p>Employee ID</p>
          </FieldLabel>
          <Input id="employee_id" type="text" name="employee_id" placeholder="Employee ID" required onChange={handleChange}/>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">
              <Lock className="w-4"/>
              <p>Password</p>
            </FieldLabel>
          </div>
          <Input id="password" name="password" type="password" placeholder="Password" required onChange={handleChange}/>
        </Field>
        <Field>
          <Button type="submit" disabled={authLoading}>Login</Button>
        </Field>      
      </FieldGroup>
    </form>
  )
}
