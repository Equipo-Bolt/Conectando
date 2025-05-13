"use client"

import Image from "next/image";

//! Frandebug
import { Button } from "@/components/ui/button";
import { updateFormProgressAction } from "./actions/form/updateFormProgress";
import { updateObjectiveClassificationAction } from "./actions/objective_classification/updateObjectiveClassification";
import { MutateFormInfo } from "@/types/TypeForm";
import { MutateObjectiveClassitionInfo } from "@/types/TypeObjectiveClassification";
import { useActionState, useTransition } from "react";

export default function Home() {
  //!Probando cmabiar de estado de form
  // const newInfo : MutateFormInfo = { id : 2, progressID : 1}
  // const [state, newAction] = useActionState(updateFormProgressAction, null)
  // const [isPending, startTransition] = useTransition();

  //!Probando cmabiar de peso
  const newInfo : MutateObjectiveClassitionInfo = { id : 1, weight : 70}
  const [state, newAction] = useActionState(updateObjectiveClassificationAction, null)
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">Under Construction</h1>
        <Image
          className="dark:invert"
          src="/wrench.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Button 
          title="hola"
          onClick={ () => startTransition( () => { newAction(newInfo)})}
        />
        {isPending ? "cargando..." : state}
        <h1> Welcome to Conectando+</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
