import { getSession, useSession } from 'next-auth/react'
import MenuCard from '@/components/common/MenuCard'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Router from 'next/router'


export default function Home() {
    // const { status, data } = useSession()

    // useEffect(() => {
    //   if (status === 'unauthenticated') Router.replace('/login')
    // }, [status])

    const [sessionUser, setSessionUser] = useState(null as any)

    // useEffect(() => {
    //     getSession().then((session) => {
    //         setSessionUser(session?.user)
    //     })
    // }, [])

    return (
        <>
            <Head><title>Workspace - Ymir</title></Head>
            <div className='flex flex-col flex-grow' >
                <h2 className={`
          text-[24px] text-[#243AB2] font-semibold transition-all duration-100
          ${sessionUser ? 'opacity-100' : 'opacity-0'} 
        `}
                >
                    {/* Olá, {sessionUser?.name!.split(' ')[0] ?? ''}! */}
                </h2>
                <span className='text-[16px] text-[#243AB2] font-semibold pt-6'>Opções</span>
                <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] pt-4'>
                    <MenuCard
                        title='Códigos'
                        description='Visualize, crie e gerencie os códigos cadastrados no sistema'
                        path='/codigos' />
                    <MenuCard
                        title='Grupos'
                        description='Visualize, crie e gerencie os grupos cadastrados no sistema'
                        path='/grupos' />
                    <MenuCard
                        title='Regras'
                        description='Visualize, crie e gerencie as regras cadastradas no sistema'
                        path='/regras' />
                </div>
            </div >
        </>
    )
}
