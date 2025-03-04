'use client';

import Link from "next/link";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";

const LoginHandler:React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>();

    const checkLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/authStatus", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const res = await response.json();
                setIsLoggedIn(res.authenticated);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        checkLogin();
        
        const handleAuthChange = () => checkLogin();
        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({}),
            });
            
            if(response.ok) {
                setIsLoggedIn(false);
                window.dispatchEvent(new Event("authChange"));
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
        {!isLoggedIn ?
        <Link href="/login">
        <Button variant='outline'>
          Zaloguj się
        </Button>
      </Link>
      : 
      <Button variant='outline' onClick={logout}>
          Wyloguj się
        </Button>
        }
      </>
    );
}

export default LoginHandler;