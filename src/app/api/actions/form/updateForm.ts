import { prisma } from '../../../../lib/prisma';
import type { Form } from '@prisma/client';

export async function updateForm(id: number, data: Form) {
  try {
    const form = await prisma.form.update({
      where: { id },
      data,
    });
    return form;
  } catch (error) {
    throw new Error('Failed to update form');
  }
} 