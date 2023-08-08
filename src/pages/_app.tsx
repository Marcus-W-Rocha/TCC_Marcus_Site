import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const isAuth = Component.name === 'Login'

  return (
    <main>
      <SessionProvider>
        <Layout isAuth={isAuth}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </main>
  )
}
