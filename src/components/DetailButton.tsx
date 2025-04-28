"use client"

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

interface DetailButtonProps {
  id: number
}

export function DetailButton({ id }: DetailButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/detalles/${id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer text-gemso-blue hover:text-gemso-dark-blue"
    >
      <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
    </button>
  )
}
