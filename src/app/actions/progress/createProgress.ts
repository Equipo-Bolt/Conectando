import { prisma } from '@/lib/prisma';
import type { Progress } from '@prisma/client';

export async function createProgress(data: Progress) {
  try {
    const progressExists = await prisma.progress.findFirst({
      where: {
        title: data.title 
      }
    });

    if (progressExists) {
      throw new Error('Progress with the same title already exists');
    }

    await prisma.progress.create({
      data : data,
    });
    
    return "New progress has been registered";
  } catch (error) {
    throw new Error('Failed to create progress');
  }
} 
