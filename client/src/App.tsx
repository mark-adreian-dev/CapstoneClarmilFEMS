import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { UserContextRole, UserRole } from "./types/User"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "./context/AuthContext/AuthContext"
import MeasuringWorkerLayout from "./layout/MeasuringWorkerLayout"
import LoadingPage from "./pages/LoadingPage"
import ProcessingWorkerLayout from "./layout/ProcessingWorkerLayout"
import ManagerLayout from "./layout/ManagerLayout"
import SystemAdminLayout from "./layout/SystemAdminLayout"
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage"
import AdminUsersPage from "./pages/Admin/AdminUsersPage"
import AdminIngridientsPage from "./pages/Admin/AdminIngridientsPage"
import AdminAreasPage from "./pages/Admin/AdminAreasPage"


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Navigate to={"/login/worker"} />} />

        <Route path="/login/worker" element={<LoginPage context={UserContextRole.WORKER} />} />
        <Route path="/login/manager" element={<LoginPage context={UserContextRole.MANAGER} />} />
        <Route path="/login/admin" element={<LoginPage context={UserContextRole.ADMIN} />} />

        <Route
          path="/worker"
          element={
            <ProtectedRoute allowedRole={UserRole.MEASURING}>
              <MeasuringWorkerLayout />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/worker/reciever"
          element={
            <ProtectedRoute allowedRole={UserRole.RECIEVER}>
              <ProcessingWorkerLayout />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole={UserRole.MANAGER}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole={UserRole.ADMIN}>
              <SystemAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />}/>
          <Route path="users" element={<AdminUsersPage />}/>
          <Route path="areas" element={<AdminAreasPage />}/>
          <Route path="ingridients" element={<AdminIngridientsPage />}/>
          <Route path="report" element={<h1>Reports</h1>}/>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
  )
}

const ProtectedRoute = ({ children, allowedRole }: { children: ReactNode, allowedRole: UserRole}) => {
  const { authLoading, isAuthenticated, user, role } = useContext(AuthContext)
  
  if (authLoading) return <LoadingPage />
  else if (!isAuthenticated || !user || !role) return <>Protected</>
  else if (user.role !== allowedRole) return <>Invalid Role</>
  else return <>{children}</>
}

export default App
