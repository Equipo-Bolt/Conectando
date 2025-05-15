"use server"

import Image from "next/image";

import { ClientComponent } from "@/components/ClientComponent";

import { getAllUsers } from "@/lib/fetches/user/getAllUsers";

//! cambiado a async para pruebas de cookies
export default async function Home() {
  //!Probando cookies en ClientComponent.tsx

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">DEMO Conectando+ Login</h1>
        <Image
          className="dark:invert"
          src="/wrench.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ClientComponent users = {await getAllUsers()}/>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="http://localhost:3000/misObjetivos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1> Welcome to Conectando+</h1>
        </a>
      </main>
    </div>
  );
}
