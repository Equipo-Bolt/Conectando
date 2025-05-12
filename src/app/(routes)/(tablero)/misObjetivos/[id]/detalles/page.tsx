import DetallesObjetivo from "@/components/DetallesObjetivo";
import { getObjectiveById } from "@/app/actions/objective/getObjectiveById";
import { notFound } from "next/navigation";

export default async function VerMasObjetivo({ params }: { params: { id: string } }) {
  const objetivo = await getObjectiveById(Number(params.id));
  if (!objetivo) return notFound();

  return <DetallesObjetivo objetivo={objetivo} />;
}

