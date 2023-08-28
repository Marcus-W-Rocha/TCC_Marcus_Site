"use Client";

import Head from "next/head";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URLBase } from "./api/auth/constant";
import Select from 'react-select'

type User = {
  id?: number;
  name?: string;
  token?: string;
  typeUser?: number;
};

export default function Relat() {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = React.useState<User>({});
  const [nomeCliente, setnomeCliente] = React.useState("");
  const [list, setList] = React.useState<any[]>([]);
  const [Anilist, setAniList] = React.useState<string[]>([]);
  const [dataIni, setDataIni] = React.useState<string>("")
  const [dataEnd, setDataEnd] = React.useState<string>("")  
  const [selectStatus, setSelectStatus] =React.useState<any>()
  const [status,setStatus] = React.useState<any[]>([
            {value: "Todos", label:"Todos"},
            {value: "Enviado", label:"Enviado"},
            {value: "Recebido", label:"Recebido"}, 
            {value: "Processado", label:"Processado"},
            {value: "Cancelado", label:"Cancelado"}])
  

  React.useEffect(() => {
    const config = {
      headers: { token: user.token },
    };
    const rec = async () => {
      const spons = (await axios.get(`${URLBase}/pedidos`, config)).data;
      setList(spons);
      console.log(spons)
      setAniList(Object.getOwnPropertyNames(spons[0]).slice(7));
    };
    if ((list.length == 0 && user.token)) {
      rec();
    }
  }, [list, user]);

  React.useEffect(() => {
    if (session.data?.user) {
      setUser(session.data?.user);
    }
  }, [session.data?.user]);

  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <div className="container max-w-[75%] mx-auto flex justify-center p-2 md:p-0">
          <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
            <p className="text-center font-bold text-black">
              Relatorios de Pedidos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
                <div className="flex border w-full rounded bg-gray-300 items-center p-2 ">
                <p>Filtrar por Cliente:</p>
                  <input
                    type="text"
                    placeholder="Nome Cliente"
                    className="text-md block px-3 py-2 rounded-lg w-full
                    bg-gray-200 border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    value={nomeCliente}
                    onChange={(a) => {
                      setnomeCliente(a.target.value);
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 border w-full rounded bg-gray-300 items-center p-2 ">
                  <p>Filtrar por Data:</p>
                  <p/>
                  <p>Inicio</p>
                  <p>Fim</p>
                  <input
                    type="date"
                    className="grid-cols-1  text-md block px-3 py-2 rounded-lg w-full
                    bg-gray-200 border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    value={dataIni}
                    onChange={(a) => {
                        if(new Date(a.target.value) <= new Date(dataEnd) || dataIni =="" || dataEnd=="")
                            setDataIni(a.target.value);
                    }}
                  />
                  <input
                    type="date"
                    className="grid-cols-2  text-md block px-3 py-2 rounded-lg w-full
                    bg-gray-200 border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    value={dataEnd}
                    onChange={(a) => {
                        if(new Date(a.target.value) >= new Date(dataIni) || dataEnd==""|| dataEnd =="")
                            setDataEnd(a.target.value);
                    }}
                  />
                </div>
                <div className="flex border w-full rounded bg-gray-300 items-center p-2 ">
                <p>Filtrar por Status:</p>
                  <p/>
                  <Select options={status} placeholder="Status" className="text-md block px-3 py-2 rounded-lg w-full
                    bg-gray-200 border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" onChange={(e) => setSelectStatus(e.value)}/>
                </div>
                
                <div className="flex flex-wrap flex-row border rounded bg-gray-300 items-center p-2 gap-2 justify-center">
                  <p className="w-full">Total de:</p>
                  {Anilist.map((element, ind) => {
                    return (
                      <div
                        key={ind}
                        className="px-3 border border-black rounded-lg"
                      >
                        <p>
                          {element}:{" "}
                          {list
                            .filter((element1) => {
                                const cond1 = element1["5nomeEmpresa"]
                                .toLowerCase()
                                .includes(nomeCliente.toLowerCase());
                                const dataSlice = element1["3data"].split("/")
                                const eleDate = new Date(dataSlice[1] + "-" + dataSlice[0] + "-" + dataSlice[2])
                            

                                const cond2 = (selectStatus == undefined || selectStatus == "Todos") || selectStatus == element1["4status"]
                                const cond3 = dataIni == "" || new Date(`${dataIni} 0:00`) <= eleDate
                                const cond4 = dataEnd == "" || new Date(`${dataEnd} 0:00`) >= eleDate

                                return cond1 && cond2 && cond3 && cond4
                            })
                            .map((ele) => {
                              return ele[element];
                            })
                            .reduce((v1?, v2?) => {
                              return (v1 || 0) + (v2 || 0);
                            },0)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <tbody>
                  <tr className="border-b font-medium dark:border-neutral-500">
                    <th scope="col" className="px-6 py-4">
                      Id Pedido
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nome Empresa
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Representante
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contato
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Data Pedido
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    {Anilist.map((ani, index) => {
                      return (
                        <th key={index} scope="col" className="px-6 py-4">
                          {ani}
                        </th>
                      );
                    })}

                  </tr>
                  {list
                    .filter((element1) => {
                        const cond1 = element1["5nomeEmpresa"]
                        .toLowerCase()
                        .includes(nomeCliente.toLowerCase());
                        const dataSlice = element1["3data"].split("/")
                        const eleDate = new Date(dataSlice[1] + "-" + dataSlice[0] + "-" + dataSlice[2])
                    

                        const cond2 = (selectStatus == undefined || selectStatus == "Todos") || selectStatus == element1["4status"]
                        const cond3 = dataIni == "" || new Date(`${dataIni} 0:00`) <= eleDate
                        const cond4 = dataEnd == "" || new Date(`${dataEnd} 0:00`) >= eleDate

                      return cond1 && cond2 && cond3 && cond4
                    })
                    .map((element) => {
                      return (
                        <tr
                          key={element["1idPedido"]}
                          className="whitespace-nowrap px-6 py-4 font-medium"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["1idPedido"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["5nomeEmpresa"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["6nomeRepresentante"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["7numRepresentante"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["3data"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["4status"]}
                          </td>
                          {Anilist.map((ani, index) => {
                            return (
                              <td
                                key={index}
                                className="whitespace-nowrap px-6 py-4 font-medium"
                              >
                                {element[ani]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
