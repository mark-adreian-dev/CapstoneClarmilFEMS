import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import LoginPageImage from "@/assets/login-page-image.jpg"
import { ModeToggle } from "@/components/mode-toggle"
import { UserContextRole } from "@/types/User"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext/AuthContext"
import LoadingPage from "./LoadingPage"

export default function LoginPage({ context }: { context: UserContextRole }) {
  const { authLoading, isLoggingIn, isAuthenticated } = useContext(AuthContext)

  if (authLoading || isLoggingIn) return <LoadingPage />

  return (
    !isAuthenticated &&
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className={`flex flex-col gap-4 p-6 md:p-10 ${context !== UserContextRole.WORKER ? "lg:order-2" : "lg:order-1" }`}>
        <div className="flex justify-between w-full gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Clarmil Manufacturing Inc.
          </a>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm context={context} />
          </div>
        </div>
      </div>
      <div className={`bg-muted relative hidden lg:block ${(context == UserContextRole.MANAGER || context == UserContextRole.ADMIN) ? "lg:order-1" : "lg:order-2" }`}>
        <img
          src={LoginPageImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  )
}
