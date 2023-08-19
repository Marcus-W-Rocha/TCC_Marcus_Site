import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Router from 'next/router'


export default function Home() {
    const [sessionUser, setSessionUser] = useState(null as any)


    return (
        <>
            <Head><title>Workspace - Ymir</title></Head>
            <div className='flex flex-col flex-grow' >
                
            </div >
        </>
    )
}
