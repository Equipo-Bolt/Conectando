import DetallesObjetivo from "@/components/DetallesObjetivo";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById"
import { getClassificationById } from "@/lib/fetches/classification/getClassificationById";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";
import { notFound } from "next/navigation";

export default async function VerMasObjetivo({ params }: { params: { id: string } }) {
  const objectiveId = await params
  const objetivo = await getObjectiveById(parseInt(objectiveId.id));
  const objetivoclasificacion = await  getObjectiveClassificationById(objetivo.objectiveClassificationID as number);
  const classification= await getClassificationById(objetivoclasificacion.classificationID as number);
  if (!objetivo) return notFound();


  return <DetallesObjetivo objetivo={objetivo} classificationTitle={classification.title}/>;

}

