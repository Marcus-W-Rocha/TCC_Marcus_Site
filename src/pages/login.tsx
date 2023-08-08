import Head from 'next/head'
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Home() {

    const router = useRouter()
    const callbackUrl = (router.query?.callbackUrl as string) || '/workspace'
    const session = useSession()

    if (session.status === 'authenticated') {
      router.replace(callbackUrl)
    }
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

    function submit() {
        // setIsSubmitting(true)
        signIn('credentials', {
          email: userCredentials.email,
          password: userCredentials.password,
          redirect: false,
        }).then((res) => {
          if (res?.error) {
            // toast(<NotificationToast type="error" text="E-mail ou senha incorreta" />)
            // setIsSubmitting(false)
          } else if (res?.ok) {
            // router.replace(callbackUrl)
          }
        })
      }

    return (
        <>
            <Head><title>Login - Ymir</title></Head>
            <button
                onClick={submit}
            >Login</button>
        </>
    )
}
