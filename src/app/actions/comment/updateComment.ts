import { prisma } from '@/lib/prisma';
import type { Comment } from '@prisma/client';

export async function updateComment(commentId: number, data: Comment) {
  try {
    await prisma.comment.update({
      where: { id : commentId },
      data,
    });
    return "Comment has been updated";
  } catch (error) {
    throw new Error('Failed to update comment');
  }
} 