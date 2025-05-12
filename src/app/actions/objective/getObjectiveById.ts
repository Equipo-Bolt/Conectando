import { TypeObjective } from "@/types/TypeObjective";

interface Comentario {
  autor: string;
  fecha: string;
  texto: string;
}

export const getObjectiveById = async (id: number): Promise<(TypeObjective & { classification: string; comentarios: Comentario[] }) | null> => {
  // Mock de datos
  const mockObjectives: (TypeObjective & { classification: string; comentarios: Comentario[] })[] = [
    {
      id: 1,
      title: "Mejorar Ventas",
      goal: "Aumentar un 10% las ventas trimestrales",
      weight: 30,
      result: null,
      grade: null,
      formID: 101,
      createdAt: new Date(),
      objectiveClassificationID: 1,
      classification: "Negocio/División",
      comentarios: [
        { autor: "María López", fecha: "2025-05-10", texto: "Excelente avance" },
        { autor: "Juan Pérez", fecha: "2025-05-09", texto: "Falta seguimiento en Q2" },
      ],
    },
    {
      id: 2,
      title: "Optimizar procesos",
      goal: "Reducir el tiempo de entrega en 15%",
      weight: 20,
      result: null,
      grade: null,
      formID: 102,
      createdAt: new Date(),
      objectiveClassificationID: 2,
      classification: "Gente",
      comentarios: [],
    },
  ];

  const objetivo = mockObjectives.find((obj) => obj.id === id);
  return objetivo ?? null;
};
