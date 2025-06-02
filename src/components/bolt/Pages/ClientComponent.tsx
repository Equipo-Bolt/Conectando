"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState} from "react";

import { setUserIdAction } from "@/app/actions/cookies/setUserId";
import { createUserWithEmailOnlyAction } from "@/app/actions/user/createUserWithEmailOnly";

import { User } from "@/types/User";
import { Input } from "@/components/ui/input";

export function ClientComponent( { users } : { users : User[] }) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string >("");

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

            onClick={() => setUserIdAction(Number(selectedUserId))}
        >Logear Usuario</Button>
        <Input 
            type="email"
            placeholder="Escribe tu correo electrónico" 
            value={userEmail}
            onChange={((e) => setUserEmail(e.target.value))}
        />
        <Button
            variant={"gemso_yellow"}
            title="Create User By Email"

            onClick={() => createUserWithEmailOnlyAction(null, userEmail)}
        >Crear Usuario Solo con Correo</Button>
        {/* {isPending ? "cargando..." : state} */}
    </>
    )
}
