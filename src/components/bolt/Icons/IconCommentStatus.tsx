"use client";

import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

interface IconCommentStatusProps {
  hasComments: boolean;
}

export default function IconCommentStatus({ hasComments }: IconCommentStatusProps) {
  return (
    <div>
      {!hasComments ? (
        <XMarkIcon className="w-[1.5rem] h-[1.5rem] text-gemso-red" />
      ) : (
        <CheckIcon className="w-[1.5rem] h-[1.5rem] text-green-800" />
      )}
    </div>
  );
}