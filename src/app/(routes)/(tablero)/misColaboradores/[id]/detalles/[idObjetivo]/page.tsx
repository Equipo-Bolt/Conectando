import BossObjectiveForm from "@/components/bolt/Inputs/BossObjectiveViewEdit";
import { getObjectiveById } from "@/lib/fetches/objective/getObjectiveById";
import { notFound } from "next/navigation";
import { Classification } from "@/types/Classification";
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";
import { getCommentsFromObjective } from "@/lib/fetches/comment/getCommentsFromObjective";
import { getUserById } from "@/lib/fetches/user/getUserById";
import CommentsSection from "@/components/bolt/Comments/CommentSection";
import GoBack from "@/components/bolt/Buttons/GoBack";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { ObjectiveProgress } from "@/types/ObjectiveProgress";
import { getFormById } from "@/lib/fetches/form/getFormById";
// NextAuth
import { auth } from "@/app/auth";

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
  params: Promise<{ id: string; idObjetivo: string }>;
}) {
  //! COOKIES SHOULD BE CHANGED OT NEXTAUTH
  const session = await auth();
  const Boss = await getUserById(Number(session?.user?.id));

  const collaboratorId = (await params).id;
  const Collaborator = await getUserById(Number(collaboratorId));

  const objectiveId = (await params).idObjetivo;
  const objective = await getObjectiveById(parseInt(objectiveId));
  const objectiveClassification = objective.objectiveClassificationID;

  const classification = await getObjectiveClassificationById(
    objectiveClassification
  );
  const classifications: Classification[] = await getAllClassifications();
  if (!objective) return notFound();

  const comments = await getCommentsFromObjective(parseInt(objectiveId));

  const form = await getFormById(Number(objective.formID));
  const progress = await getProgressById(form.progressID);
  const progressStatus = progress.title as ObjectiveProgress;

  const updatedObjective: UpdateObjectiveFormData = {
    id: objective.id,
    formID: objective.formID,
    title: objective.title,
    goal: objective.goal,
    result: objective.result,
    weight: objective.weight.toString(),
    classification: classification.classificationCatalogID.toString(),
    grade: objective.grade?.toString(),
  };
  return (
    <div>
      <div className="flex items-center gap-x-2 mb-4">
        <GoBack route={`/misColaboradores/${collaboratorId}`} />
        <h1 className="text-3xl font-bold">Detalles del Objetivo</h1>
      </div>
      <p className="text-lg font-medium mb-6">
        Colaborador: {Collaborator.fullName}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <BossObjectiveForm
          objective={updatedObjective}
          classifications={classifications}
          progress={progressStatus}
        />
        <CommentsSection
          initialComments={comments}
          objectiveId={parseInt(objectiveId)}
          commenterId={Boss.id ? Boss.id : 0}
          isMutable={true}
        />
      </div>
    </div>
  );
}
