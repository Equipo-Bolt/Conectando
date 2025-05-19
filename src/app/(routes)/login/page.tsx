import { LoginForm } from "@/components/bolt/Inputs/LoginForm"
import Image from "next/image"
import LogoGemso from "@/../public/Logo-GEMSO.png"
import LoginGemso from "@/../public/Login-GEMSO.png"

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 py-[3rem]">
      <div className="flex flex-col gap-4 pl-[8rem] pr-[4rem] items-start justify-center">
        <div className="flex h-auto w-full">
            <Image
                src={LogoGemso}
                alt="Gemso Logo"
                width={2000}
                height={691}
                className="w-1/3"
            >
            </Image>
        </div>
        <div className="flex flex-1 w-full  items-center">
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-[4rem] pr-[8rem] items-start justify-center hidden lg:flex">
        <Image
          src={LoginGemso}
          alt="Login"
          className="max-h-[50rem] max-w-[50rem] w-full rounded-lg"
        >
        </Image>
      </div>
    </div>
  )
}
