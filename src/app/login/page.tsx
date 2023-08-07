"use client";
import { useContext, useEffect } from "react";

import { UserContext } from "@/contexts/UserProvider";

export default function Home() {

    const { user, setUser } = useContext(UserContext);

    return (
        <main className="flex flex-col justify-center items-center">
            Aqui a pagina de login. No momento só o botão.

            <button onClick={(e)=>{
                e.preventDefault()
                console.log(user);

                var mockUser = { nome: "ADM", token: "admManda" };

                setUser(mockUser);
            }}>
                Fazer login mockado
            </button>
        </main>
    );
}
