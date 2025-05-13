import DetallesObjetivo from "@/components/DetallesObjetivo";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { TypeClassification } from "@/types/TypeClassification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { MutateObjectiveInfo } from "@/types/TypeObjective";

export default async function VerMasObjetivo({
    params,
}: {
    params: { id: string };
}) {
    const objectiveId = await params;
    const objetivo = await getObjectiveById(parseInt(objectiveId.id));
    const objectiveClassification = objetivo.objectiveClassificationID;
    const classifications: TypeClassification[] = await getAllClassifications();
    if (!objetivo) return notFound();

    const mutatedObjective: MutateObjectiveInfo = {
        id: objetivo.id,
        formID: objetivo.formID,
        title: objetivo.title,
        goal: objetivo.goal,
        result: objetivo.result,
        weight: objetivo.weight,
        classificationCatalogID: objectiveClassification
    };

    return (
        <DetallesObjetivo
            objective={mutatedObjective}
            classifications={classifications}
            comments={objetivo.comments}
        />
    );
}
