export default interface User {
    nome?: String;
    token?: String;
}

export default interface UserContextProps {
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}
