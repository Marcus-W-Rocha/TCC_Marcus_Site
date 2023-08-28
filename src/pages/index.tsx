import Head from "next/head";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import {Md5} from "ts-md5"

export default function Index() {
  const router = useRouter();
  const session = useSession();
  const [passwordVisibility, setPasswordVisibility] = React.useState("password");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (session.status == "authenticated"){
    router.push("/menu")
  }
  const loginAuth = async () => {
      console.log(username,password)
      if (username.length<5 || password.length<5){
        return
      }
      signIn("credentials", {userName: username, password: Md5.hashStr(password), redirect: false}).then((response)=>{
        if(response?.status == 401){
          window.alert("Credenciais Invalidas")
        }
        
      });
  };

  return (
    <>
      <Head>
        <title>Bem Vindo</title>
      </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Entre na sua Conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="text"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5
                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={username}
                  onChange={(e) => {
                      setUsername(e.target.value);
                  }}
                />
              </div>
              {(username.length > 0 && username.length<5)?<p className="text-red-600">Usuario Invalido</p>: <p> </p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
                
              </div>
              <div className="mt-2 flex flex-row flex-nowrap  rounded-md border-0 
                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset 
                  focus-within:ring-indigo-600 sm:text-sm sm:leading-6 p-1">
                <input
                  id="password"
                  name="password"
                  type={passwordVisibility}
                  autoComplete="current-password"
                  required
                  className="block w-full py-1.5 border-0 focus:border-0 focus:ring-0 py-0"
                  value={password}
                  onChange={(e) => {
                      setPassword(e.target.value);
                  }}
                />
                <button className="inline-block m-0 py-0" onClick={() =>{
                  if(passwordVisibility=="password"){
                    setPasswordVisibility("text")
                  }
                  else{
                    setPasswordVisibility("password")
                  }
                }}>Show</button>
              </div>
              {(password.length > 0 && password.length<5)?<p className="text-red-600">Senha Invalida</p>: <p> </p>}
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 
                px-3 py-1.5 text-sm font-semibold leading-6
                text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={loginAuth}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
