import Head from "next/head";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";

type User = {
    id?: number;
    name?: string;
    token?: string;
    typeUser?: number;

}

export default function Menu() {
    const router = useRouter();
    const session = useSession();
    const [user,setUser] = React.useState<User>({})
    console.log(session)

    React.useEffect(() =>{
        if(session.data?.user){
            setUser(session.data?.user)
        }
    },[session.data?.user]
    )

    return (
        <>
         <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200 h-full">  
        <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                <div className="rounded-xl bg-white shadow-xl">
                    <div className="p-6 sm:p-16">
                        <div className="space-y-4">
                            
                            <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Bem Vindo, {user.name}</h2>
                        </div>
                        <div className="mt-16 grid space-y-4">
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                            hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"  
                            onClick={()=>{
                                router.push("/cadCliente")
                            }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                    group-hover:text-blue-600 sm:text-base">Cadastrar Cliente</span>

                                </div>
                            </button>
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                            hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"  onClick={()=>{
                                router.push("/cadAdmin")
                            }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                     group-hover:text-blue-600 sm:text-base">Cadastrar Administrador</span></div>
                            </button>
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" onClick={()=>{
                                            router.push("/procPedido")
                                        }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                     group-hover:text-blue-600 sm:text-base">Processar Pedido</span>
                                </div>
                            </button>
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"  onClick={()=>{
                                            router.push("/relat")
                                        }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                     group-hover:text-blue-600 sm:text-base">Relatorios</span>
                                </div>
                            </button>
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" onClick={()=>{
                                            router.push("/consulta")
                                        }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                     group-hover:text-blue-600 sm:text-base">Consultar Cliente/Estoque</span>
                                </div>
                            </button>
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" onClick={()=>{
                                            router.push("/editPerfil")
                                        }}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                                     group-hover:text-blue-600 sm:text-base">Editar Perfil</span>
                                </div>
                            </button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        </>
    )
}
