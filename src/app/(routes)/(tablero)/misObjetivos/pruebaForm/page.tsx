'use client'
import { createFormAction } from "@/app/actions/form/createForm"
import { disableForm } from "@/app/actions/form/disableForm"
import { disableUser } from "@/app/actions/user/disableUser"
import { useActionState } from "react"
import { updateObjectiveClassificationAction } from "@/app/actions/objective_classification/updateObjectiveClassification"
import { createCommentAction } from "@/app/actions/comment/createComment"

export default function PruebaForm(){
    const [message, action, isPending] = useActionState(createFormAction, null)
    const [messageCom, actionCom, isPendingCom] = useActionState(createCommentAction, null)

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = e.currentTarget;
        const weightInput = form.elements.namedItem("weightInput") as HTMLInputElement;

        if (weightInput) {
            console.log("Weight value:", weightInput.value);
            updateObjectiveClassificationAction(null, {id:1, weight:Number(weightInput.value)})
        }
    }

    //  function handleSubmitComment(e:React.FormEvent<HTMLFormElement>){
    //     e.preventDefault();

    //     const formComment = e.currentTarget;
    //     const comment = formComment.elements.namedItem("commentInput") as HTMLInputElement;

    //     if(comment){
    //         console.log("Comment: ", comment.value);
    //         const result = createCommentAction(null, {description: comment.value, objectiveID: 16, commenterID: 2})
    //         console.log(result.success)
    //     }
    // }

    return(
        <div>
            <h1>Holaaa</h1>
            <button onClick={() => action(2)}>Crear Form</button>
            <div>
                {isPending? (
                    <h2>Enviando</h2>
                    ) : message?.success? (
                    <h2>{message.message}</h2>
                    ) : (
                    <h2>{message?.error}</h2>
                    )
                }
            </div>
            <div>
                <button onClick={() => disableForm(null, Number("6"))}>Borrar Form</button>
            </div>
            <div>
                <button onClick={() => disableUser(1)}>Borrar Usuario</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Peso Clasificacion Objetivos"
                        defaultValue={0}
                        name={"weightInput"}
                    />
                    <div>
                        <button type="submit">Submit Peso</button>
                    </div>
                </form>
            </div>

            <div>
                {/* <form onSubmit={handleSubmitComment}> */}
                    {/* <input
                        placeholder="Comentario"
                        defaultValue={""}
                        name={"commentInput"}
                    /> */}
                    <div>
                        <button onClick={() => actionCom({description: "Hola", objectiveID: 16, commenterID: 10})}>Submit Comment</button>
                    </div>
                    <div>
                        {isPendingCom? (
                            <h2>Enviando</h2>
                            ) : messageCom?.success? (
                            <h2>{messageCom.message}</h2>
                            ) : (
                            <h2>{messageCom?.error}</h2>
                            )
                        }
                    </div>
                {/* </form> */}
            </div>
        </div>
    )
}
