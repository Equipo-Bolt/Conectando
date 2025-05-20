"use server";

import { prisma } from '@/lib/prisma';

import { ServerActionResponse } from '@/types/ServerActionResponse';

import { MutateComment } from '@/types/Comment';
import { getObjectiveById } from '@/lib/fetches/objective/getObjectiveById';
import { getUserById } from '@/lib/fetches/user/getUserById';

/**
 * * createFormAction() Creates a comment

 * @param prevState<ServerActionResponse> Initial state of action, set this parameter to null
 * @param data<MutateComment> ID of the logged in user
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createCommentAction(
  prevState: ServerActionResponse | null,
  data: MutateComment
): Promise<ServerActionResponse> {

  try {

    if (!data.objectiveID) {
      throw new Error("objectiveID es requerido en 'data'");
    }

    if (!data.commenterID) {
      throw new Error("commenterID es requerido en 'data'");
    }

    if(!data.description){
      throw new Error("No se puede crear un comentario vacío.")
    }

    const objectiveExists = await getObjectiveById(data.objectiveID)
    if(!objectiveExists.id){
      throw new Error("El objetivo no existe");
    }

    const commenterExists = await getUserById(data.commenterID)
    if(!commenterExists.id){
      throw new Error("El usuario comentando no existe")
    }

    await prisma.comment.create({
      data: {
        description: data.description,
        commentedAt: new Date(),
        objective: {
          connect: {
            id: data.objectiveID
          }
        },
        commenter: {
          connect: {
            id: data.commenterID
          }
        },
      }
    });

    return {success: true, message: "Comentario creado"}

  } catch (error) {
    console.error(`Error when creating comment: ${(error as Error).message}`)
    return {success: false, error: `${(error as Error).message}`}
  }
} 