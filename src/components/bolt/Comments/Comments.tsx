"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Comment } from "@/types/Comment";
import { MutateComment } from "@/types/Comment";
import { createCommentAction } from "@/app/actions/comment/createComment";
import { updateCommentAction } from "@/app/actions/comment/updateComment";


interface CommentsSectionProps {
  initialComments: Comment[];
  objectiveId: number;
  commenterId: number;
}

export default function CommentsSection({
  initialComments,
  objectiveId,
  commenterId,
}: CommentsSectionProps) {
  const [allComments, setAllComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showNewComment, setShowNewComment] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const [state, createAction] = useActionState(createCommentAction, null)
  const [isPendingCreate, startCreateTransition] = useTransition();
    const [isPendingEdit, startEditTransition] = useTransition();

  const [updateState, updateAction] = useActionState(updateCommentAction, null);

  const handleSaveEdited = async (id: number) => {
  const updatedEntry: MutateComment = {
    id,
    description: editedText,
    commenterID: commenterId,
    objectiveID: objectiveId,
  };

  await startEditTransition(() => {
    updateAction(updatedEntry)
  });
};

useEffect(() => {
  if (updateState?.success) {
    window.location.reload();

  } else if (updateState?.error) {
    console.error("Error al actualizar el comentario:", updateState.error);
  }
}, [updateState]);

  async function handleAddComment() {
    if (newComment.trim() === "") return;

    const newEntry: MutateComment = {
      description: newComment,
      commenterID: commenterId,
      objectiveID: objectiveId,
    };

    await startCreateTransition(() => {
      createAction(newEntry);
    });


    setNewComment("");
    setShowNewComment(false);
  };

  useEffect(() => {
    if (state?.success) {
      console.log(state)
      window.location.reload();
    } else if (state?.error) {
      console.error("Error al crear el comentario:", state.error);
    }
  }, [state]);


  return (
    <div className="space-y-4 border-l pl-4">
      {/* Section title */}
      <h2 className="text-lg font-semibold">Comentarios</h2>

      {/* Comments container with a fixed height and scrollable overflow */}
      <div className="max-h-72 overflow-y-auto space-y-2">
        {allComments.length === 0 ? (
          // Display a message if there are no comments
          <p className="text-gray-500 text-sm">Sin comentarios</p>
        ) : (
          // Map through all comments and render them
          allComments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded p-3 bg-gray-50 text-sm flex justify-between items-start gap-2"
            >
              <div className="flex-1">
                {/* Commenter's name and date */}
                <strong>{comment.commenter?.fullName}</strong>
                <span className="text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("es-MX")}
                </span>
                {editingId === comment.id ? (
                  // Render the edit mode for the comment
                  <>
                    <Textarea
                      className="mt-2 w-full resize-none max-h-40 overflow-auto"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="gemso_blue"
                        onClick={() => handleSaveEdited(comment.id)}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="gemso_white_and_blue"
                        onClick={() => {
                          setEditingId(null);
                          setEditedText("");
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  // Render the comment text
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="mt-2 whitespace-pre-wrap [overflow-wrap:anywhere]">
                      {comment.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Dropdown menu for editing or deleting the comment */}
              {editingId !== comment.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditedText(comment.description);
                      }}
                    >
                      Modificar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))
        )}
      </div>

      {/* Section for adding a new comment */}
      {editingId === null &&
        (showNewComment ? (
          <div className="mt-4">
            <Textarea
              className="w-full resize-none max-h-30 overflow-y-auto"
              placeholder="Agregar nuevo comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Button variant={"gemso_blue"} onClick={handleAddComment}>
                Guardar Comentario
              </Button>
              <Button
                variant="gemso_white_and_blue"
                onClick={() => {
                  setNewComment("");
                  setShowNewComment(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant={"gemso_blue"}
            onClick={() => setShowNewComment(true)}
          >
            Agregar Comentario
          </Button>
        ))}
    </div>
  );
}
