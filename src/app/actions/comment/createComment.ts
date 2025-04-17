import { prisma } from '@/lib/prisma'; //! Changed path to use @ shortcut
import type { Comment } from '@prisma/client';
//! Cannot use type of prisma because it forces frontend to know or access
//! data they shouldnt.

/**
 * ! This is an example of the data Frontend will need to send to backend if we use prisma type
 * 
  const dummy: Form = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    evaluatorID: 1,
    collaboratorID : 1,
    progressID: 1,
    approvedAt: null,
    gradedAt: null,
    deactived: t
  };
  *TODO The implementation is still correct but in the future will need---
  *TODO--- to create interfaces (sorry).
 */


export async function createComment(data: Comment) {
  if (!data.objectiveID) {
    throw new Error('objectiveID is required in data');
  }

  try {
    //! We can omit creating a comment separately and then linkin it ---
    await prisma.objective.update({
      where: { id: data.objectiveID },
      data: {
        comments: {
          create: data //*--- By using the create method in the comments of an objective
        }
      }
    });

    return "Comment created"; //!Frontend will (probably) not use the created entity this way
  } catch (error) {
    throw new Error('Failed to create comment');
  }
} 