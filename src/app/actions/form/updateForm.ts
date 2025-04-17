import { prisma } from '@/lib/prisma';
import type { Form } from '@prisma/client';

export async function updateForm(formId: number, data: Form) {
  try {
    await prisma.form.update({
      where: { id: formId },
      data,
    });
    return "Form has been updated";
  } catch (error) {
    throw new Error('Failed to update form');
  }
} 