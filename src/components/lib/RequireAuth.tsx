import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { http } from "../../app/http/http";


const authService = AuthService.getInstance(http)

export function RequireAuth() {
    const location = useLocation()
    const isAuth = authService.store(state => state.isAuth)

    if(!isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet/>
}