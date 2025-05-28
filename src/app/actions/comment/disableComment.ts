"use server";

import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/types/ServerActionResponse';

/**
 * ! THIS ACTION SHOULD NOT BE USED ACCORDING TO GEMSO CLIENT
 * * disableCommentAction() Disables a comment

 * @param prevState<{@link ServerActionResponse}> Initial state of action, set this parameter to null
 * @param commentId<number> ID of the comment to disable.
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function disableCommentAction(
  prevState: ServerActionResponse | null,
  commentId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: { deactivated: true },
    });
    
    return { success: true, message: "El comentario ha sido desactivado" };
  } catch (error) {
    console.error(
      `Error when disabling comment: ${(error as Error).message}`
    );
    return { success: false, error: `${(error as Error).message}` };
  }
} 