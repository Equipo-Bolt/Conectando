import { prisma } from '../../../../lib/prisma';
import type { Comment } from '@prisma/client';

export async function updateComment(id: number, data: Comment) {
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data,
    });
    return comment;
  } catch (error) {
    throw new Error('Failed to update comment');
  }
} 