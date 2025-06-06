"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { ChevronLeft, ChevronRight, } from "lucide-react"
import { PencilIcon } from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";

import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";

import { disableDivisionAction } from "@/app/actions/division/disableDivision";

export default function DivisionCollapsible({
    children,
    title,
    division,
}: {
    children: React.ReactNode
    title: string
    division: { key: number; title: string; }
}) {
    const router = useRouter();

    return (
    <Collapsible className="w-full">
        <CollapsibleTrigger asChild className="border border-gray-200 cursor-pointer c">
            <div className="flex justify-between w-full p-[1rem] text-left bg-gray-100 rounded-lg focus:outline-none cursor-pointer gap-[0.5rem]">
                <span className="text-lg font-semibold">
                    {title}
                </span>

                <div className="flex items-center">
                    <button
                    type="button"
                    onClick={() => {
                        router.push(`/catalogos/division/${division.key}`);
                    }}
                    className="p-1"
                    >
                    <PencilIcon className="w-5 h-5 cursor-pointer" color="#023b72" />
                    </button>

                    <DeleteButton
                    id={division.key}
                    title="Eliminar Area"
                    description="¿Estás seguro de que deseas eliminar esta división? Esta acción no se puede deshacer."
                    handleConfirm={async (key) => {
                        await disableDivisionAction(null, key);
                        window.location.reload();
                    }}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                    />

                    <ChevronLeft className="size-xl transition-transform duration-200 transform hover:opacity-80" />
                    <ChevronRight className="size-xl transition-transform duration-200 transform hover:opacity-80" />
                </div>
            </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="bg-white rounded-lg h-auto">
            {children}
        </CollapsibleContent>
    </Collapsible>
    )
}