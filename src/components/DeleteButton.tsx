"use client"

import { useState } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { TrashIcon as TrashSolid} from "@heroicons/react/24/solid" 
import { DeleteModal } from "@/components/DeleteModal"

//! A este boton se le va a introducir los props como titulo, descripcion, botones y funcion
//!  para que le mande esto mismo al delete modal y se muestre y realice lo que necesite ese modal

interface DeleteButtonProps {
  id: number
  title: string
  description: string
  handleConfirm: (id: number) => void
  cancelText?: string
  confirmText?: string
  icon?: React.ReactNode
}


export function DeleteButton({
  id,
  title,
  description,
  handleConfirm,
  cancelText = "Cancelar",
  confirmText = "Eliminar",
  icon = <TrashSolid className="w-10 h-10" />,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  function onConfirm() {
    handleConfirm(id);
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gemso-red hover:text-gemso-red/80"
      >
        <TrashIcon className="cursor-pointer w-5 h-5" />
      </button>

      <DeleteModal
        id={id}
        icon={icon}
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
        cancelText={cancelText}
        confirmText={confirmText}
        handleConfirm={onConfirm}
      />
    </>
  )
}
