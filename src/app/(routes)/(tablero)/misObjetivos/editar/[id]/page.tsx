import EditObjective from "@/components/bolt/Inputs/EditObjective";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { Classification } from "@/types/Classification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";

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
  const objetivo = await getObjectiveById(parseInt(objectiveId.id));
  const objectiveClassification = objetivo.objectiveClassificationID;
  const classification = await getObjectiveClassificationById(objectiveClassification);
  const classifications: Classification[] = await getAllClassifications();
  if (!objetivo) return notFound();

  const updatedObjective: UpdateObjectiveFormData = {
    id: objetivo.id,
    formID: objetivo.formID,
    title: objetivo.title,
    goal: objetivo.goal,
    result: objetivo.result,
    weight: objetivo.weight.toString(),
    classification: classification.classificationID.toString(),
  };

  return (
    <EditObjective
      objective={updatedObjective}
      classifications={classifications}
      comments={objetivo.comments}
    />
  );
}
