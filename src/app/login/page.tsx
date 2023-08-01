'use client'
import { useEffect, useState } from "react";


export default function Home() {

    const [loginData, setLoginData] = useState(false);

    return (
        <main className="flex flex-col justify-center items-center">
            Aqui a pagina de login. No momento só o botão.

            <button onClick={(e)=>{
                e.preventDefault()
                console.log(loginData);

                setLoginData((previusValue)=>{
                    return !previusValue;
                });
            }}>
                Fazer login mockado
            </button>
        </main>
    );
}
