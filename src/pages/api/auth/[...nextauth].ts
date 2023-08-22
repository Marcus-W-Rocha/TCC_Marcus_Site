// import { API_URL } from "@/constants"
import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    token: string
  }
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as { username: string, password: string }

        // const res = await axios.post(`https://google.com`, {
        //   "email": email,
        //   "password": password,
        // })
        const res = await axios.get(`https://google.com`)//request login

        // const res = {
        //   status: 200,
        //   data: { id: 0, name: "Mock_User", email: "mock@email.com", token: "mocktoken" }
        // }

        if (res.data == "Credenciais inválidas") {
          throw new Error('Credenciais inválidas')
        }

        if (res.data) {
          return { id: 0, name: "Mock_User", email: "mock@email.com", token: "mocktoken" }// atribuir dados de login
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        if ('token' in user) {
          token.token = user.token
        }
      }
      return token
    },
    async session({ session, token }) {
      session.token = token.token as string
      return session
    },
  },
  pages: {
    signIn: '/',
  }
})