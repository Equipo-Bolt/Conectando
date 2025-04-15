import { prisma } from '../../../../lib/prisma';

export async function disableForm(id: number) {
  try {
    const form = await prisma.form.update({
      where: { id },
      data: { deactived: true },
    });
    return form;
  } catch (error) {
    throw new Error('Failed to disable form');
  }
} 