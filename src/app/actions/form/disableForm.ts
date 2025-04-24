"use server";

import { prisma } from '@/lib/prisma';

export async function disableForm(formId: number) {
  try {
    await prisma.form.update({
      where: { id : formId },
      data: { deactived: true },
    });
    return "Form has been disabled";
  } catch (error) {
    throw new Error('Failed to disable form');
  }
} 