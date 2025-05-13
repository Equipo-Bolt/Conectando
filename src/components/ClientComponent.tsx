"use client"

//! El proposito de este componente es probar actions en la home page

//! Frandebug
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState, useActionState, useTransition } from "react";

import { updateFormProgressAction } from "@/app/actions/form/updateFormProgress";
import { updateObjectiveClassificationAction } from "@/app/actions/objective_classification/updateObjectiveClassification";

import { setUserIdAction } from "@/app/actions/cookies/setUserId";

import { MutateFormInfo } from "@/types/TypeForm";
import { MutateObjectiveClassificationInfo } from "@/types/TypeObjectiveClassification";

import { TypeUser } from "@/types/TypeUser";

export function ClientComponent( { users } : { users : TypeUser[] }) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    
    //!Probando cambiar de peso
    ////const newInfo : MutateObjectiveClassificationInfo = { id : 1, weight : 70}
    ////const [state, newAction] = useActionState(updateObjectiveClassificationAction, null)
    ////const [isPending, startTransition] = useTransition();

    
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
