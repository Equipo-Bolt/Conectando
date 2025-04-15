import { prisma } from '../../../../lib/prisma';

export async function disableComment(id: number) {
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { deactived: true },
    });
    return comment;
  } catch (error) {
    throw new Error('Failed to disable comment');
  }
} 