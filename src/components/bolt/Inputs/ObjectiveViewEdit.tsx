"use client";

import { useCallback } from "react";
import { Form } from "@/components/ui/form";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { Classification } from "@/types/Classification";
import { ObjectiveProgress } from "@/types/ObjectiveProgress";

// Hooks
import { useObjectiveForm } from "@/hooks/updateObjective/useUpdateObjectiveForm";
import { useUpdateObjectiveAction } from "@/hooks/updateObjective/useUpdateObjectiveAction";

// Components
import { FormStatus } from "@/components/bolt/ObjectiveForm/FormStatus";
import { FormFooter } from "@/components/bolt/ObjectiveForm/FormFooter";
import {
  TitleField,
  ClassificationField,
  WeightField,
  GoalField,
  ResultField,
  GradeField,
  FinalGradeField,
} from "@/components/bolt/ObjectiveForm/FormFields";

interface ObjectiveFormProps {
  objective: UpdateObjectiveFormData;
  classifications: Classification[];
  progress: ObjectiveProgress;
}

/**
 * @description A React component that renders a form for viewing and editing an objective.
 * It supports various fields such as title, classification, weight, goal, result, and grade.
 * The form is configurable and allows toggling between editable and non-editable states.
 *
 * @param {ObjectiveFormProps} props - The props for the ObjectiveForm component.
 * @param {Objective} props.objective - The objective data to be displayed and edited.
 * @param {Classification[]} props.classifications - The list of classifications available for selection.
 * @param {Progress} props.progress - The progress data associated with the objective.
 *
 * @returns {JSX.Element} The rendered ObjectiveForm component.
 */
export default function ObjectiveForm({
  objective,
  classifications,
  progress,
}: ObjectiveFormProps) {
  const {
    form,
    formConfig,
    isEditable,
    toggleEditable,
    cancelEdit,
    setIsEditable,
    updateCurrentValues,
  } = useObjectiveForm({ objective, progress: progress });

  const { state, isPending, executeAction } = useUpdateObjectiveAction(
    setIsEditable,
    updateCurrentValues // Pasamos la función al hook de acción
  );

  const handleSubmit = useCallback(
    async (data: UpdateObjectiveFormData) => {
      await executeAction(data);
    },
    [executeAction]
  );

  return (
    <div className="md:col-span-2 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormStatus state={state} isPending={isPending} />
          {/* Objective Title */}
          <div className="grid grid-cols-1 gap-6">
            {formConfig.title.visible && (
              <TitleField
                control={form.control}
                isEditable={isEditable}
                required={formConfig.title.required}
                editable={formConfig.title.editable}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Objective Classification */}
            {formConfig.classification.visible && (
              <ClassificationField
                control={form.control}
                classifications={classifications}
                isEditable={isEditable}
                required={formConfig.classification.required}
                editable={formConfig.classification.editable}
              />
            )}
            {/* Objective Weight */}
            {formConfig.weight.visible && (
              <WeightField
                control={form.control}
                isEditable={isEditable}
                required={formConfig.weight.required}
                editable={formConfig.weight.editable}
              />
            )}
          </div>

          {/* Objective Goal */}
          {formConfig.goal.visible && (
            <GoalField
              control={form.control}
              isEditable={isEditable}
              required={formConfig.goal.required}
              editable={formConfig.goal.editable}
            />
          )}

          {/* Objective Result */}
          {formConfig.result.visible && (
            <ResultField
              control={form.control}
              isEditable={isEditable}
              required={formConfig.result.required}
              editable={formConfig.result.editable}
            />
          )}

          {/* Objective Grade */}
          {formConfig.grade.visible && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GradeField
                control={form.control}
                isEditable={isEditable}
                required={formConfig.grade.required}
                editable={formConfig.grade.editable}
              />
              <FinalGradeField control={form.control} />
            </div>
          )}

          <FormFooter
            isEditable={isEditable}
            isPending={isPending}
            showEditButton={formConfig.showEditButton}
            editButtonText={formConfig.editButtonText}
            onEdit={toggleEditable}
            onCancel={cancelEdit}
          />
        </form>
      </Form>
    </div>
  );
}
