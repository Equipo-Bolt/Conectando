import { prisma } from '../../../../lib/prisma';
import type { Comment } from '@prisma/client';

export async function createComment(data: Comment) {
  if (!data.objectiveID) {
    throw new Error('objectiveID is required in data');
  }

  try {
    const comment = await prisma.comment.create({
      data,
    });

    await prisma.objective.update({
      where: { id: data.objectiveID },
      data: {
        comments: {
          connect: { id: comment.id }
        }
      }
    });

    return comment;
  } catch (error) {
    throw new Error('Failed to create comment');
  }
} 