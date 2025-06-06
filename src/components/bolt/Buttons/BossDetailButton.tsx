"use client";

import { useRouter } from "next/navigation";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

interface DetailButtonProps {
  id: number;
  collaboratorId: number;
}

export const BossDetailButton = ({ id, collaboratorId }: DetailButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${collaboratorId}/detalles/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
      aria-label="Ver detalles"
    >
      <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
    </button>
  );
};
