"use client"

import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions/auth/logout";

import { User } from "@/types/User";

export function ClientComponent( { users } : { users : User[] }) {

    return(
    <>
        {!!users ? <></> : <></>}
        <Button
            variant={"gemso_yellow"}
            title="Log Out"

            onClick={() => logOut(null)}
        >Cerrar Sesión</Button>
        {/* {isPending ? "cargando..." : state} */}
    </>
    )
}
