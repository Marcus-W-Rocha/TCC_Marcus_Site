"use client";
import { useContext } from "react";

import { UserContext } from "@/contexts/UserProvider";
import { useRouter } from "next/navigation";

export default function Home() {

    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    return (
        <main className="flex flex-col justify-center items-center">
            Aqui a pagina de login. No momento só o botão.

            <button onClick={(e)=>{
                // e.preventDefault()
                // console.log(user);

                var mockUser = { nome: "ADM", token: "admManda" };

                setUser(mockUser);
                router.push('/home')
            }}>
                Fazer login mockado
            </button>
        </main>
    );
}
