import { useEffect, useState } from "react"
import { http } from "../app/http/http"
import { AuthService } from "../services/AuthService"

const authService = AuthService.getInstance(http)

export const useAuth = () => {
    const [isAuth, setAuth] = useState(authService.getIsAuthorized())

    const getUser = async () => {
       await authService.authByCookie()
       setAuth(authService.getIsAuthorized())
    }

    function logout() {
        authService.logout()
        setAuth(false)
    }

     useEffect(() => {
        getUser()
    }, [])

    return {isAuth, logout}
}