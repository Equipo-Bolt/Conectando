"use server";

import { prisma } from '@/lib/prisma';
import { MutateComment } from '@/types/Comment';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { getCommentById } from '@/lib/fetches/comment/getCommentById';

/**
 * * updateCommentAction() Updates a comment

 * @param prevState<{@link ServerActionResponse}> Initial state of action, set this parameter to null
 * @param data<{@link MutateComment}> Must include id of the comment to edit and description.
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function updateCommentAction(
  prevState: ServerActionResponse | null, 
  data: MutateComment
): Promise<ServerActionResponse> {
  try {

    if (!data.id) {
      throw new Error("Data debe contener en id el id del comentario a modificar");
    }

    if(!data.description){
      throw new Error("El comentario no puede estar vacío")
    }

    const commentExists = await getCommentById(data.id)
    if(!commentExists.id){
      throw new Error("El comentario a modificar no existe")
    }

    if(commentExists.description === data.description){
      return { success: true, message: "No se realizaron cambios" };
    }

    await prisma.comment.update({
      where: { id : data.id },
      data: {
        description: data.description
      }
    });

    return { success: true, message: "El comentario ha sido modificado" };
  } catch (error) {
    console.error(`Error when updating comment: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
} 