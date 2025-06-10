"use client"

import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions/auth/logout";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
    const router = useRouter();
    return(
    <>
        <Button
            title="Log Out"
            className="flex w-full justify-start rounded-lg bg-gemso-red hover:bg-gemso-red/90 h-[3rem]"
            onClick={() => logOut(null)
                .then(() => router.push("/login"))
            }
        >   
            <span />
            <ArrowLeftStartOnRectangleIcon className="w-[1.5rem] h-[1.5rem]" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
        </Button>
        {/* {isPending ? "cargando..." : state} */}
    </>
    )
}
