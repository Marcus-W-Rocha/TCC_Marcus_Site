"use client";

import { useEffect, useState } from "react";
import App_Name from "@/components/General_Info";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
    var actual_page = usePathname();
    const router = useRouter();

    useEffect(() => {
        var logged = true

        if (actual_page !== "/login" && !logged) {
            router.replace("/login");
        }
    }, [actual_page, router]);

    return (
        <header>
            <button className="rounded-md bg-slate-300 m-2 p-2 hover:bg-slate-400">
                Voltar
            </button>
            <div className="text-4xl">{App_Name()}</div>
            <Image
                className="rounded-full hover:cursor-pointer"
                height={100}
                width={100}
                src="/user_place_holder.png"
                alt="Login Image"
            />
        </header>
    );
}
