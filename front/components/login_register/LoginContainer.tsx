"use client";

import Image from "next/image";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginContainer:React.FC = ()=>{
    const [login, setLogin] = useState(true);
    const changeForm = () => {
        setLogin(!login);
    }

    return <div className="my-8 grid grid-cols-2 border-2 rounded-2xl border-gray-200 shadow-sm">
    <Image src="/images/login.png" alt="Login image" width={600} height={500} className="object-contain"/>
    {login ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
</div>
}

export default LoginContainer;