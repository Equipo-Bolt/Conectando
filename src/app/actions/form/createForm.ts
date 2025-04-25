"use server";

import { prisma } from '@/lib/prisma';
import type { Form } from '@prisma/client';

export async function createForm(data: Form) {
  if (!data.collaboratorID) {
    throw new Error('collaboratorID is required in data');
  }

  try {
    await prisma.user.update({
      where: { id: data.collaboratorID },
      data: {
        writtenForms: {
          create: data
        }
      }
    });

    return "Form created for user";
  } catch (error) {
    throw new Error('Failed to create form');
  }
} 