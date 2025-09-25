import { useState } from 'react'
import './authPage.css'
import { Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { http } from '../../app/http/http';
import { AuthService } from '../../services/AuthService';




    const authService = AuthService.getInstance(http)

    export function AuthPage(){
        const [values, setValues] = useState({login: "", password: ""})
        const isAuth = authService.store(state => state.isAuth)

        const onChange =  (type: "login" | "password", value: string) => {
        setValues(prev => ({...prev, [type]: value}))
        }


        const onSuccessLogin = () => {
            authService.login(values.login, values.password)
        }


        if(isAuth) {
            return <Navigate to={"/"} />
        }
  

    return <div className="auth-page-wrapper">
      
        <div className='auth-window'>
             <TextField title='Введите email' type='text' value={values.login} onChange={(e) => onChange("login", e.target.value)}/>
             <TextField title='Введите пароль' type='password' value={values.password} onChange={(e) => onChange("password", e.target.value)}/>
             <Button onClick={onSuccessLogin} color='warning' variant='contained'>войти</Button>
        </div>
    </div>
}