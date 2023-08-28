import { ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const session = useSession();
  const logout = () => {
    signOut();
  };
  const router = useRouter();
  return (
    <>
      <header className="bg-white">
        <nav className="flex justify-between w-full bg-white text-gray-700 p-4">
          <div className="md:items-center md:w-auto flex">
            {router.pathname !== "/" ? (
              <button
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                
                onClick={() => {
                  router.back();
                }}
              >
                <strong>{"<- "}</strong>Voltar
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="text-gray-800 text-3xl font-semibold">
            Gestão de Abates
          </div>
          <div className="md:items-center md:w-auto flex">
            {router.pathname !== "/" ? (
              <button
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                
                onClick={logout}
              >
                Sair
              </button>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
