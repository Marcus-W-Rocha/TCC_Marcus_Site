import Head from 'next/head'
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Index() {
    const router = useRouter()
    const session = useSession()
    console.log(session)
    return (

        <>
            <Head><title>Bem Vindo</title></Head>
            <button
                onClick={() =>{
                    const user = {
                        username: "Admin",
                        senha: "senhaAdmin",
                        redirect: false
                    }
                    signIn("credentials",user).then((value) => {
                        if(value?.error){
                            console.log("erro de credencial")
                        }else if (value?.ok){
                            console.log("----------------")
                            router.push("/home")
                        }
                    })
                }}
            >Entrar</button>
        </>
    )
}
