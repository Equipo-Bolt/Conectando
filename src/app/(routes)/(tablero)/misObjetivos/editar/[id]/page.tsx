import EditarObjetivo from "@/components/EditarObjetivo";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { TypeClassification } from "@/types/TypeClassification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { MutateObjectiveInfo } from "@/types/TypeObjective";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";

export default async function VerMasObjetivo({
    params,
}: {
    params: { id: string };
}) {
    const objectiveId = await params;
    const objetivo = await getObjectiveById(parseInt(objectiveId.id));
    const objectiveClassification = objetivo.objectiveClassificationID;
    const classification = getObjectiveClassificationById(objectiveClassification)
    const classifications: TypeClassification[] = await getAllClassifications();
    if (!objetivo) return notFound();

    const mutatedObjective: MutateObjectiveInfo = {
        id: objetivo.id,
        formID: objetivo.formID,
        title: objetivo.title,
        goal: objetivo.goal,
        result: objetivo.result,
        weight: objetivo.weight,
        classificationCatalogID: (await classification).classificationID
    };

    return (
        <EditarObjetivo
            objective={mutatedObjective}
            classifications={classifications}
            comments={objetivo.comments}
        />
    );
}
