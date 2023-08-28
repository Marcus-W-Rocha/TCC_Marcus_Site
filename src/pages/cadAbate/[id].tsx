import * as React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { URLBase } from "../api/auth/constant";
import { Md5 } from "ts-md5";

type User = {
  id?: number;
  name?: string;
  token?: string;
  typeUser?: number;
};

export default function Id() {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = React.useState<User>({});
  const [listAbates, setListAbates] = React.useState<any[]>([]);

  React.useEffect(() => {
    const config = {
      headers: { token: user.token },
    };
    const rec = async () => {
      const perf = (
        await axios.get(
          `${URLBase}/detalhesPedido/idps//${router.query.id}`,
          config
        )
      ).data;
      const lista: any[] = [];
      perf.map((element: any) => {
        for (var a = 0; a < element["quant"]; a++) {
          const b = {
            idTipoAnimal:element["idTipoAnimal"],
            especie: element["especie"],
            pesoViavel: "",
            pesoCondenado: "",
          };
          lista.push(b);
        }
        setListAbates(lista);
      });
    };
    if (user.token && router.query.id) {
      rec();
    }
  }, [router.query.id, user.token]);

  React.useEffect(() => {
    if (session.data?.user) {
      setUser(session.data?.user);
    }
  }, [session.data?.user]);

  const addAbate = async () =>{
    let error: boolean = false
    listAbates.map((ele) => {
      let listPesosViaveis = ele["pesoViavel"].split(",")
      let listPesosConde = ele["pesoCondenado"].split(",")
      listPesosViaveis.map((a:string)=>{
        if (a==""){
          error = true
          return
        }
      })
      listPesosConde.map((a:string)=>{
        if (a==""){
          error = true
          return
        }
      })
    })
    console.log(error)
    if (error==false){
      const config = {
        headers: { token: user.token },
      };
      let a = await axios.post(`${URLBase}/abates/${router.query.id}`,listAbates,config)
      let b = (await axios.get(`${URLBase}/pedidos/idp/${router.query.id}`,config)).data
      const date = b[2].split("/")
      const newDate = date[2]+"-"+date[1]+"-"+date[0]
      let ped = {
          dataPedido:newDate,
          status: "Processado"
      }
      b = (await axios.put(`${URLBase}/pedidos/idp/${router.query.id}`,ped,config)).data
      router.back()
    }
  }
  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <div className="container max-w-[75%] mx-auto flex justify-center p-2 md:p-0">
          <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
            <p className="text-center font-bold text-black text-3xl">
              Processar Pedidos
            </p>
            <p className="text-center font-bold text-gray-600 text-1">
              Os campos abaixo devem ser preenchidos com os pesos separados por virgula
            </p>
            <div className="min-w-full  ">
              <table className="min-w-full text-left text-sm font-light">
                <tbody>
                  <tr>
                  <th />
                  <th scope="col" className="px-6 py-4 text-center">
                    Pesos Viável
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Pesos Condenados
                  </th>
                  </tr>
                  {listAbates.map((element, index) => {
                    return (
                      <tr
                        key={index}
                        className="whitespace-nowrap px-6 py-4 font-medium"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {element["especie"]}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <input
                            placeholder=""
                            type="text"
                            value={element["pesoViavel"]}
                            onChange={(e) => {
                              const newList = [...listAbates];
                              setListAbates(
                                newList.map((abate, ida) => {
                                  if (ida == index) {
                                    return {
                                      ...abate,
                                      pesoViavel: e.target.value.replace(/[^0-9,]/g,""),
                                    };
                                  }
                                  return abate;
                                })
                              );
                            }}
                            className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                     focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <input
                            placeholder=""
                            type="text"
                            value={element["pesoCondenado"]}
                            onChange={(e) => {
                              const newList = [...listAbates];
                              setListAbates(
                                newList.map((abate, ida) => {
                                  if (ida == index) {
                                    return {
                                      ...abate,
                                      pesoCondenado: e.target.value.replace(/[^0-9,]/g,""),
                                    };
                                  }
                                  return abate;
                                })
                              );
                            }}
                            className="text-md block px-3 py-2 rounded-lg w-full
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                     focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button className="mt-3 text-lg font-semibold
                                bg-gray-800 w-full text-white rounded-lg
                                px-6 py-3 block shadow-xl hover:text-white hover:bg-black" 
                                onClick={addAbate}>Finalizar Cadastro</button>
          </div>
        </div>
      </div>
    </>
  );
}
