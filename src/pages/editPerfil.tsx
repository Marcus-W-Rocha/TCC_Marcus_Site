import { useRouter } from "next/router";
import * as React from "react";
import {  useSession } from "next-auth/react";
import axios from "axios";
import {URLBase} from './api/auth/constant';
import {Md5} from "ts-md5"

type User = {
    id?: number;
    name?: string;
    token?: string;
    typeUser?: number;

}

export default function EditPerfil(){
    const router = useRouter();
    const session = useSession();
    const [nomeRepres, setNomeRepres] = React.useState("")
    const [contRepres, setContRepres] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confPassword, setConfPassword] = React.useState("")
    const [nomeRepresError, setNomeRepresError] = React.useState(false)
    const [contRepresError, setContRepresError] = React.useState(false)
    const [userNameError, setUserNameError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [confPasswordError, setConfPasswordError] = React.useState(false)
    const [user,setUser] = React.useState<User>({})
    const [perfil,setPerfil] = React.useState<any[]>([])

    React.useEffect(() => {
        const config = {
          headers: { token: user.token },
        };
        const rec = async () => {
          const perf = (await axios.get(`${URLBase}/clientes/idc/${session.data?.user?.id}`, config)).data[0];
          setPerfil(perf)
          setNomeRepres(perf[2])
          setContRepres(perf[3])
          setUserName(perf[4])
        };
        if ((perfil.length == 0 && user.token)) {
          rec();
        }
      }, [perfil, session.data?.user?.id,user.token]);
    
    React.useEffect(() =>{
        if(session.data?.user){
            setUser(session.data?.user)
        }
    },[session.data?.user])

    const atualizar = async () => {
        if(nomeRepres =="") setNomeRepresError(true)
        if(contRepres =="") setContRepresError(true)
        if(userName =="") setUserNameError(true)
        if(password =="") setPasswordError(true)
        if(confPassword =="") setConfPasswordError(true)
        if( nomeRepres =="" || contRepres =="" || userName =="" || userName.length<5|| 
        password =="" || password.length<5|| confPassword =="" || confPassword !=password) return
        const a = {
            representante:nomeRepres,
            contato:contRepres,
            username:userName,
            senha: Md5.hashStr(password),
            type: 2
        }
        const config = {
            headers: { token: user.token },
          };
        try {
            const response = await axios.put(`${URLBase}/clientes/idc/${perfil[0]}`,a,config)
            window.alert("Atualizado com Sucesso")
            router.push("/menu")
        } catch (error) {
            console.log("error")
        }
    }

    return(
        <>
        <div className="container max-w-full  mx-auto md:py-12 px-1 min-h-screen">
        <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
            <div className="w-full relative h-full">
                <div className="md:mt-6">
                    <div className="text-center font-bold text-black">
                    Editar Perfil
                    </div>
                    <form className="mt-8" x-data="{password: '',password_confirm: ''}">
                        <div className="mx-auto max-w-lg ">
                            
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Nome Colaborador</span>
                                <input placeholder="" type="text"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                     focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    value={nomeRepres}
                                    onChange={(e) => {
                                        setNomeRepres(e.target.value);
                                        setNomeRepresError(false)
                                    }}/>
                                    {(nomeRepresError)?<p className="text-red-600 text-xs">Campo Obrigatorio</p>: <p> </p>}
                            </div>

                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Contato Colaborador</span>
                                <input placeholder="" type="text"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md 
                                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    value={contRepres}
                                    onChange={(e) => {
                                        setContRepres(e.target.value);
                                        setContRepresError(false)
                                    }}/>
                                    {(contRepresError)?<p className="text-red-600 text-xs">Campo Obrigatorio</p>: <p> </p>}
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Usuario</span>
                                <input placeholder="" type="text"
                                        className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md 
                                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    value={userName}
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                        setUserNameError(false)
                                    }}/>
                                    {(userNameError)?<p className="text-red-600 text-xs">Campo Obrigatorio</p>: <p> </p>}
                                    {(userName.length>0 && userName.length<5)?<p className="text-red-600 text-xs">Minimo de 5 caracters</p>: <p> </p>}
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Senha</span>
                                <input placeholder="" type="password" x-model="password"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md 
                                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(false)
                                    }}
                                    />
                                    {(passwordError)?<p className="text-red-600 text-xs">Campo Obrigatorio</p>: <p> </p>}
                                    {(password.length>0 && password.length<5)?<p className="text-red-600 text-xs">Minimo de 5 caracters</p>: <p> </p>}
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Confirmar Senha</span>
                                <input placeholder="" type="password" x-model="password_confirm"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    value={confPassword}
                                    onChange={(e) => {
                                        setConfPassword(e.target.value);
                                        setConfPasswordError(false)
                                    }}
                                    />
                                    {(confPasswordError)?<p className="text-red-600 text-xs">Campo Obrigatorio</p>: <p> </p>}
                                    {(confPassword.length>0 && password != confPassword)?<p className="text-red-600 text-xs">Senhas não Identicas</p>: <p> </p>}
                            </div>
                            <div className="flex justify-start mt-3 ml-4 p-1">
                               
                            </div>

                        </div>
                    </form>
                    <button className="mt-3 text-lg font-semibold
                                bg-gray-800 w-full text-white rounded-lg
                                px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                                onClick={atualizar}>
                                Confirmar Edição
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}