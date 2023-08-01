import App_Name from '@/components/General_Info'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
        <button
            className='rounded-md bg-slate-300 m-2 p-2 hover:bg-slate-400'
        >Voltar</button>
        <div
            className='text-4xl'
        >{App_Name()}</div>
        <Image
            className='rounded-full hover:cursor-pointer'
            height={100}
            width={100}
            src='/user_place_holder.png' alt="Login Image"
        />
    </header>
  )
}
