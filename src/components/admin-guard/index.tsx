import { useAuthStore } from "@/stores/authStore"
import { Navigate } from "react-router-dom"

interface AdminGuardProps {
    children: React.ReactNode
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
