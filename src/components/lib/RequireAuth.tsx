import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";



export function RequireAuth() {
    const auth = useAuth()
    const location = useLocation()

    if(!auth.isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet/>
}