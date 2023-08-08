import { ReactNode } from "react"
import App_Name from "../common/General_Info"
import Image from "next/image";


interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <header>
            <div></div>

                <div className="text-4xl">{App_Name()}</div>
                <Image
                    className="rounded-full hover:cursor-pointer"
                    height={100}
                    width={100}
                    src="/user_place_holder.png"
                    alt="Login Image"
                />
            </header>
            {children}
        </div>
    )
}