import { useState } from 'react'
import './authPage.css'
import { Navigate, useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';






export function AuthPage(){
    const auth = useAuth()
    const [values, setValues] = useState({login: "", password: ""})
    const navigate = useNavigate()


    const onChange =  (type: "login" | "password", value: string) => {
       setValues(prev => ({...prev, [type]: value}))
    }


    const onSuccessLogin = () => {
        navigate("/panel")
    }

    if(auth.isAuth) {
        return <Navigate to={"/panel"} />
    }


 
  

    return <div className="auth-page-wrapper">
        <div className='auth-window'>
             <TextField   title='Введите логин' type='text' value={values.login} onChange={(e) => onChange("login", e.target.value)}/>
             <TextField title='Введите пароль' type='password' value={values.password} onChange={(e) => onChange("password", e.target.value)}/>
             <Button onClick={onSuccessLogin} color='warning' variant='contained'>войти</Button>
        </div>
    </div>
}