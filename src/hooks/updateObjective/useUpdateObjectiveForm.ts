import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormConfig } from "@/utils/ObjectiveFormUtils/getObjectiveConfig";
import { ObjectiveSchemaSelectionCol } from "@/utils/ObjectiveFormUtils/schemaSelectionCol";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { ObjectiveProgress } from "@/types/ObjectiveProgress";

interface UseObjectiveFormParams {
  objective: UpdateObjectiveFormData;
  progress: ObjectiveProgress;
}

export const useObjectiveForm = ({
  objective,
  progress,
}: UseObjectiveFormParams) => {
  const [isEditable, setIsEditable] = useState(false);

  const formConfig = useMemo(() => getFormConfig(progress), [progress]);
  const selectedSchema = useMemo(
    () => ObjectiveSchemaSelectionCol(progress),
    [progress]
  );

  const form = useForm<UpdateObjectiveFormData>({
    resolver: zodResolver(selectedSchema),
    defaultValues: useMemo(
      () => ({
        id: objective.id,
        formID: objective.formID,
        title: objective.title,
        weight: objective.weight.toString(),
        classification: objective.classification,
        goal: objective.goal ?? "",
        result: objective.result ?? "",
        grade: objective.grade,
      }),
      [objective]
    ),
  });

  const toggleEditable = useCallback(() => {
    setIsEditable((prev) => !prev);
  }, []);

  const cancelEdit = useCallback(() => {
    form.reset();
    setIsEditable(false);
  }, [form]);

  return {
    form,
    formConfig,
    isEditable,
    toggleEditable,
    cancelEdit,
    setIsEditable,
  };
};
