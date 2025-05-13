"use client";

import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { getCommentsFromObjective } from "@/lib/fetches/comment/getCommentsFromObjective";

import { TypeComment } from "@/types/TypeComment";

interface IconCommentStatusProps {
  objectiveId: number;
}

export default function IconCommentStatus({ objectiveId }: IconCommentStatusProps) {
  const [hasComments, setHasComments] = useState<TypeComment[] | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await getCommentsFromObjective(objectiveId);
        setHasComments(result);
      } catch (error) {
        console.error('Error checking comments:', error);
        setHasComments(null);
      }
    };
    
    fetchStatus();
  }, [objectiveId]);

  // Show a loading state while fetching status
  if (hasComments === null) {
    return <div className="animate-pulse w-[1.5rem] h-[1.5rem] bg-gray-200 rounded-full"></div>;
  }

  return (
    <div>
      {hasComments ? (
        <XMarkIcon className="w-[1.5rem] h-[1.5rem] text-gemso-red" />
      ) : (
        <CheckIcon className="w-[1.5rem] h-[1.5rem] text-green-800" />
      )}
    </div>
  );
}