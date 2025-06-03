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

/**
 * A custom hook for managing the state and behavior of an objective form.
 *
 * @description
 * This hook provides functionality to handle the form state, validation, and editability
 * of an objective form. It includes methods for toggling edit mode, canceling edits, and
 * resetting the form to its default values. The hook also dynamically selects the schema
 * and configuration based on the provided progress.
 *
 * @param {UseObjectiveFormParams} params - The parameters for the hook.
 * @param {Objective} params.objective - The objective data to populate the form.
 * @param {number} params.progress - The progress value used to determine form configuration and schema.
 *
 * @returns {Object} The hook's return values.
 * @returns {UseFormReturn<UpdateObjectiveFormData>} return.form - The form instance for managing state and validation.
 * @returns {FormConfig} return.formConfig - The configuration for the form based on progress.
 * @returns {boolean} return.isEditable - A flag indicating whether the form is in editable mode.
 * @returns {() => void} return.toggleEditable - A function to toggle the editable state of the form.
 * @returns {() => void} return.cancelEdit - A function to cancel edits and reset the form to its default values.
 * @returns {(value: boolean) => void} return.setIsEditable - A function to manually set the editable state.
 */
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
