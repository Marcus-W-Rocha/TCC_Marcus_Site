import Link from "next/link"
import Head from "next/head"
// import { WalkingIllustration } from "@/components/icons";


const Page404 = () => {
  return (
    <div>
      <Head><title>Página não encontrada</title></Head>
      <div className="flex flex-col sm:flex-row w-full h-screen items-center justify-center">
        {/* {WalkingIllustration} */}
        <div className="flex flex-col items-center sm:items-start justify-center ml-0 sm:ml-5 mt-5 sm:mt-0 ">
          <h1 className="text-6xl font-semibold">404</h1>
          <p className="text-xl mt-2">Página não encontrada!</p>
          <Link className="underline mt-5" href='/workspace'>
            Voltar para a página inicial do Ymir
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;