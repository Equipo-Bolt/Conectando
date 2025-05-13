import DetallesObjetivo from "@/components/DetallesObjetivo";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById"
import { notFound } from "next/navigation";

export default async function VerMasObjetivo({ params }: { params: { id: string } }) {
  const objectiveId = await params
  const objetivo = await getObjectiveById(parseInt(objectiveId.id));
  if (!objetivo) return notFound();

  return <DetallesObjetivo objetivo={objetivo} />;
}

