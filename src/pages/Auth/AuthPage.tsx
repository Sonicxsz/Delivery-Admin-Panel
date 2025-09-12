import { useEffect } from 'react'
import { http } from '../../app/http/http'
import { AuthService } from '../../services/AuthService'
import './authPage.css'


const service = AuthService.getInstance(http)
export function AuthPage(){
   


    useEffect(() => {
        setTimeout(() => {
            service.login("arbih@mail.ru", "Uzumaki8928")
        }, 2000)
    }, [])

    return <div className="auth-page-wrapper">
        Auth page
    </div>
}