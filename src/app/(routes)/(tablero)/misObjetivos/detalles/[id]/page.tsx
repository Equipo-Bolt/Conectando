import ObjectiveForm from "@/components/bolt/Inputs/ObjectiveViewEdit";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { Classification } from "@/types/Classification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";
import { getCommentsFromObjective } from "@/lib/fetches/comment/getCommentsFromObjective";
import CommentsSection from "@/components/bolt/Comments/Comments";

/**
 * @description This page component is responsible for rendering the edit objective interface.
 * It fetches the objective details, its classification, and all available classifications
 * to populate the form for editing an objective. If the objective is not found, it returns a 404 page.
 *
 * @param {Object} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the objective to be edited.
 *
 * @returns {JSX.Element} The EditObjective component populated with the fetched data.
 */
export default async function EditObjectivePage({
  params,
}: {
  params: { id: string };
}) {
  const objectiveId = await params;
  const objective = await getObjectiveById(parseInt(objectiveId.id));
  const objectiveClassification = objective.objectiveClassificationID;
  const classification = await getObjectiveClassificationById(
    objectiveClassification
  );
  const classifications: Classification[] = await getAllClassifications();
  if (!objective) return notFound();
  const comments = await getCommentsFromObjective(parseInt(objectiveId.id));

  const updatedObjective: UpdateObjectiveFormData = {
    id: objective.id,
    formID: objective.formID,
    title: objective.title,
    goal: objective.goal,
    result: objective.result,
    weight: objective.weight.toString(),
    classification: classification.classificationID.toString(),
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Detalles del Objetivo</h1>
      <p className="text-base mb-6">
        <strong>Colaborador:</strong> Daniel Fernández
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ObjectiveForm
          objective={updatedObjective}
          classifications={classifications}
          comments={objective.comments}
        />
        <CommentsSection
          initialComments={comments}
          objectiveId={parseInt(objectiveId.id)}
        />
      </div>
    </div>
  );
}
