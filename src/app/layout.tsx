import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import App_Name from '@/components/General_Info'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: App_Name(),
  description: 'Projeto de Aplicativo para gerenciamento de unidades de beneficiamento de carnes (UGBC)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        
        {children}
      </body>
    </html>
  )
}
