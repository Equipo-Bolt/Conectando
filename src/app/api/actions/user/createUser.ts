import { prisma } from '../../../../lib/prisma';
import type { User } from '@prisma/client';

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
} 
