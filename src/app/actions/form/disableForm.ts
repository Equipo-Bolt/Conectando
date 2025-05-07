"use server";

import { prisma } from '@/lib/prisma';

export async function disableForm(formId: number) {
  try {
    await prisma.form.update({
      where: { id : formId },
      data: { deactived: true },
    });
    return "Formulario ha sido desactivado";
  } catch (error) {
    throw new Error('Error al desactivar Formulario');
  }
} 