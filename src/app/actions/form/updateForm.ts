"use server";

import { prisma } from '@/lib/prisma';
import type { Form } from '@prisma/client';

export async function updateForm(formId: number, data: Form) {
  try {
    await prisma.form.update({
      where: { id: formId },
      data,
    });
    return "Formulario ha sido actualizado";
  } catch (error) {
    throw new Error(`Error al actualizar Formulario: ${(error as Error).message}`);
  }
} 