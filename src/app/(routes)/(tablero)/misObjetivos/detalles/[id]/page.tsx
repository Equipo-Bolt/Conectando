import ObjectiveDetails from "@/components/bolt/Inputs/ObjectiveDetails";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { TypeClassification } from "@/types/TypeClassification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { MutateObjectiveInfo } from "@/types/TypeObjective";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";

/**
 * @description This page component fetches and displays the details of a specific objective
 *              based on the provided objective ID. It retrieves the objective's information,
 *              its classification, and all available classifications to render the details
 *              along with associated comments.
 *
 * @param {Object} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the objective to fetch details for.
 *
 * @returns {JSX.Element} A React component that renders the objective details page.
 *
 * @async
 */
export default async function ObjectiveDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const objectiveId = await params;
  const objetivo = await getObjectiveById(parseInt(objectiveId.id));
  const objectiveClassification = objetivo.objectiveClassificationID;
  const classification = getObjectiveClassificationById(
    objectiveClassification
  );
  const classifications: TypeClassification[] = await getAllClassifications();
  if (!objetivo) return notFound();

  const mutatedObjective: MutateObjectiveInfo = {
    id: objetivo.id,
    formID: objetivo.formID,
    title: objetivo.title,
    goal: objetivo.goal,
    result: objetivo.result,
    weight: objetivo.weight,
    classificationCatalogID: (await classification).classificationID,
  };

  return (
    <>
      <ObjectiveDetails
        objective={mutatedObjective}
        classifications={classifications}
        comments={objetivo.comments}
      />
    </>
  );
}
