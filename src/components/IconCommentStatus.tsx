import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { getCommentsFromObjective } from "@/lib/fetches/comment/getCommentsFromObjective";

interface IconCommentStatusProps {
  objectiveId: number;
}

async function IconCommentStatus({ objectiveId }: IconCommentStatusProps) {
  const comments = await getCommentsFromObjective(objectiveId);
  const hasComments = comments.length > 0;

  return (
    <div>
      {hasComments ? (
        <CheckIcon className="w-[1.5rem] h-[1.5rem]" />
      ) : (
        <XMarkIcon className="w-[1.5rem] h-[1.5rem]" />
      )}
    </div>
  );
}

export default IconCommentStatus;