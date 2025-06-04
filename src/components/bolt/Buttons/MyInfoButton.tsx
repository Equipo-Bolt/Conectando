"use client"

import { Button } from "@/components/ui/button";

import { UserIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

export default function MyInfoButton() {
    return(
    <>
        <Button
            title="Log Out"
            className="flex w-full justify-start rounded-lg bg-gemso-blue hover:bg-gemso-blue/90 h-[3rem]"
            asChild
        >
            <Link
                href={"/miInformacion"}
                className={"flex items-center text-white rounded-lg p-[0.625em]"}
            >
                <UserIcon className="w-[1.5rem] h-[1.5rem]" />
                <span className="text-sm font-medium">Mi Información</span>
            </Link>
        </Button>
        {/* {isPending ? "cargando..." : state} */}
    </>
    )
}
