"use Client";

import Head from "next/head";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URLBase } from "./api/auth/constant";
import { config } from "process";

type User = {
  id?: number;
  name?: string;
  token?: string;
  typeUser?: number;
};

export default function Consulta() {
  const router = useRouter();
  const session = useSession();
  const refModal = React.useRef<HTMLDivElement>(null);
  const [user, setUser] = React.useState<User>({});
  const [nomeCliente, setnomeCliente] = React.useState("");
  const [list, setList] = React.useState<any[]>([]);
  const [Anilist, setAniList] = React.useState<string[]>([]);
  const [editedStock, setEditedStock] = React.useState<boolean>(false);
  const [idModal, setIdModal] = React.useState<any>("");
  const [novosValores, SetNovosValores] = React.useState<number[]>([]);

  React.useEffect(() => {
    const config = {
      headers: { token: user.token },
    };
    const rec = async () => {
      const spons = (await axios.get(`${URLBase}/estoque`, config)).data;
      setList(spons);
      setAniList(Object.getOwnPropertyNames(spons[0]).slice(4));
      SetNovosValores(
        Object.getOwnPropertyNames(spons[0])
          .slice(4)
          .map(() => {
            return 0;
          })
      );
      setEditedStock(false);
    };
    if ((list.length == 0 && user.token) || editedStock) {
      rec();
    }
  }, [list, user, editedStock]);

  React.useEffect(() => {
    if (session.data?.user) {
      setUser(session.data?.user);
    }
  }, [session.data?.user]);

  const openModal = (cliente: any) => {
    setIdModal(cliente);
    SetNovosValores(
      Anilist.map((e) => {
        return cliente[e];
      })
    );
    if (refModal != null) {
      refModal.current.style.display = "flex";
    }
  };

  const closeModal = () => {
    if (refModal != null) {
      refModal.current.style.display = "none";
    }
  };

  const addEstoque = async () => {
    const listEnviar = novosValores
      .map((element, index) => {
        return {
          idCliente: idModal["idCliente"],
          tipoAnimal: Anilist[index],
          quantidade: element,
        };
      })
      .filter((e) => {
        return e.quantidade >= 0;
      });
    const config = {
      headers: { token: user.token },
    };
    console.log(listEnviar)
    await axios.put(
      `${URLBase}/estoque/idc/${idModal["idCliente"]}`,
      listEnviar,
      config
    );
    setEditedStock(true);
    closeModal();
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <div className="container max-w-[75%] mx-auto flex justify-center p-2 md:p-0">
          <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
            <p className="text-center font-bold text-black">
              Consultar Clientes e Estoques
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
                <div className="flex border w-full rounded bg-gray-300 items-center p-2 ">
                  <svg
                    className="fill-current text-gray-800 mr-2 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                    />
                  </svg>
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
                              return element1.nomeEmpresa
                                .toLowerCase()
                                .includes(nomeCliente.toLowerCase());
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
                      Id Cliente
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
                    {Anilist.map((ani, index) => {
                      return (
                        <th key={index} scope="col" className="px-6 py-4">
                          {ani}
                        </th>
                      );
                    })}
                    <th scope="col" className="px-6 py-4">
                      Opções
                    </th>
                  </tr>
                  {list
                    .filter((element1) => {
                      return element1.nomeEmpresa
                        .toLowerCase()
                        .includes(nomeCliente.toLowerCase());
                    })
                    .map((element) => {
                      return (
                        <tr
                          key={element["idCliente"]}
                          className="whitespace-nowrap px-6 py-4 font-medium"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["idCliente"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["nomeEmpresa"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["nomeRepres"]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {element["contRepres"]}
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
                          <td className="whitespace-nowrap px-2 py-2 font-medium flex flex-col gap-y-1">
                            <button className="m-0"
                              onClick={() => {
                                openModal(element);
                              }}
                            >
                              Adicionar Estoque
                            </button>
                            <button onClick={()=>{
                                router.push(`/editClient/${element["idCliente"]}`)
                            }} className="m-0">
                              Editar Cliente
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={refModal}
        className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated faster"
        style={{ display: "none" }}
      >
        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Adicionar Estoque</p>
              <div
                className="modal-close cursor-pointer z-50"
                onClick={closeModal}
              >
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
            <div className="my-5">
              <table className="min-w-full text-left text-sm font-light">
                <tbody>
                  <tr className="border-b font-medium dark:border-neutral-500">
                    <th scope="col" className="px-4 py-2 w-1/3">
                      Especies
                    </th>
                    <th scope="col" className="px-4 py-2 w-1/3">
                      Atual
                    </th>
                    <th scope="col" className="px-4 py-2 w-1/3">
                      Novo
                    </th>
                  </tr>
                  {Anilist.map((element, index) => {
                    return (
                      <tr
                        key={index}
                        className="whitespace-nowrap  font-medium"
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-medium">
                          {element}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium">
                          {idModal[element]}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium">
                          <input
                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                            focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            type="number"
                            value={novosValores[index]}
                            onChange={(e) => {
                              var valores = [...novosValores];
                              valores[index] = e.target.valueAsNumber;
                              if (e.target.valueAsNumber >= 0)
                                SetNovosValores(valores);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button
                className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                disabled={
                  novosValores.length == 0 ||
                  novosValores
                    .map((e) => {
                      return e < 0;
                    })
                    .reduce((v1?, v2?) => {
                      return v1 || v2;
                    })
                }
                className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white enabled:hover:bg-teal-400"
                onClick={addEstoque}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
