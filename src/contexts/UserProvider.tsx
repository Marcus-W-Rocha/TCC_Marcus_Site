"use client"

import { createContext, useContext, useEffect, useState } from "react";

import UserContextProps from "@/contexts/types";
import User from "@/contexts/types";

export const UserContext = createContext<UserContextProps>({user: null, setUser: () => {}});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<User>({user: null, setUser: () => {}});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
