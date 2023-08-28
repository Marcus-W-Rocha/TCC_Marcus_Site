import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {URLBase} from './constant'

declare module "next-auth" {
    interface Session {
        token: string;
        user?: {
            id?: number;
            token?: string;
            nome?: string;
            typeUser?: number;
        };
    }
    interface User {
        id: number;
        token: string;
        typeUser?: number;
    }
}

type userCredentials = {
    userName: string;
    password: string;
};

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials: userCredentials) {
                const { userName, password } = credentials;
                var res = await axios.post(`${URLBase}/clientes/login`, {
                        user: userName,
                        senha: password,
                    });

                if (res.data == "Credenciais inválidas" || res.data[5] != 2) {
                    throw new Error("Credenciais inválidas");
                }
                if (res.data) {
                    return {
                        id: res.data[0],
                        name: res.data[2],
                        token: res.data[6],
                        typeUser: res.data[5],
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    token: user.token,
                    typeUser: user.typeUser,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.token = token.token as string;
            if (session.user && token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
});