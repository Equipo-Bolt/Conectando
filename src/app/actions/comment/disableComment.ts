"use server";

import { prisma } from '@/lib/prisma';

export async function disableComment(commentId: number) {
  try {
    await prisma.comment.update({
      where: { id : commentId },
      data: { deactivated: true },
    });
    return "Comment has been disabled";
  } catch (error) {
    throw new Error('Failed to disable comment');
  }
} 