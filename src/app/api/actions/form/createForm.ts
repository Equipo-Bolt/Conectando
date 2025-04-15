import { prisma } from '../../../../lib/prisma';
import type { Form } from '@prisma/client';

export async function createForm(data: Form, userId: number) {

  if (!data.collaboratorID) {
    throw new Error('collaboratorID is required in data');
  }

  try {
    const form = await prisma.form.create({
      data,
    });

    await prisma.user.update({
      where: { id: data.collaboratorID },
      data: {
        writtenForms: {
          connect: { id: form.id }
        }
      }
    });

    return form;
  } catch (error) {
    throw new Error('Failed to create form');
  }
} 