import { ReactNode } from "react"
import { useSession, signOut } from "next-auth/react";


interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const session = useSession()

    return (
        <div>
            <header>

            </header>
            {children}
        </div>
    )
}