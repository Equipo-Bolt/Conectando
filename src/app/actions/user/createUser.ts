import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';

export async function createUser(data: User) {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { employeeNumber : data.employeeNumber },
          { email : data.email },
        ]
      }
    })

    if (userExists) {
      throw new Error('User with the same employee number or email already exists');
    }
  
    await prisma.user.create({
      data : data,
    });
    return "User has been created";
  } catch (error) {
    throw new Error('Failed to create user');
  }
} 
