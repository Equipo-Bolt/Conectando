"use client"

//! El proposito de este componente es probar actions en la home page

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState} from "react";

import { setUserIdAction } from "@/app/actions/cookies/setUserId";

import { User } from "@/types/User";

export function ClientComponent( { users } : { users : User[] }) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    
    return(
    <>
        <Select onValueChange={(value) => setSelectedUserId(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Selecciona un usuario" />
            </SelectTrigger>
            <SelectContent>
                {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                    {user.fullName}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button
            variant={"gemso_yellow"}
            title="cookie"

            //! cookie, aqui seteamos el usuario de la aplicaion
            onClick={() => setUserIdAction(Number(selectedUserId)).finally( ()=>{ alert("cookie creada, user:" + selectedUserId)})}
        
            //* cambiar peso onClick={ () => startTransition( () => { newAction(newInfo)})}
        >Logear Usuario</Button>
        {/* {isPending ? "cargando..." : state} */}
    </>
    )
}
