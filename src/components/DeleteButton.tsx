"use client"

import { TrashIcon } from "@heroicons/react/24/outline"


interface DeleteButtonProps {
  id: number
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const handleDelete = () => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este elemento?")
    if (confirmDelete) {
      console.log("Eliminar elemento con id:", id)
      // Aquí podrías hacer fetch a la API para eliminar
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-gemso-red hover:text-gemso-cherry"
    >
        <TrashIcon className="w-5 h-5" />
    </button>
  )
}
