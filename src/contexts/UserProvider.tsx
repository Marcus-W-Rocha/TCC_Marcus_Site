"use client"

import { createContext, useEffect, useState } from "react";

import UserContextProps from "@/contexts/types";

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const str_user = sessionStorage.getItem("user");
        if (str_user != null && user != null) {
            var old_user = JSON.parse(str_user);
            if (old_user != user) {
                sessionStorage.setItem("user", JSON.stringify(user));
            }
        }else if (str_user != null && user == null) {
            var old_user = JSON.parse(str_user);
            setUser(old_user);
        }
    }, [user, setUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
