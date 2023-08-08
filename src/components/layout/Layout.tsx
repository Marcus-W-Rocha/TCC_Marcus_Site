import { ReactNode } from "react"
import App_Name from "../common/General_Info"
import { useSession, signOut } from "next-auth/react";


interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const session = useSession()

    return (
        <div>
            <header>
            <div></div>

                <div className="text-4xl">{App_Name()}</div>
                {session.status === 'authenticated'?(
                    <div>
                        Aqui para o logout
                        <button onClick={()=>signOut()}>Exit</button>
                    </div>
                ):(
                    <div></div>
                )}
            </header>
            {children}
        </div>
    )
}