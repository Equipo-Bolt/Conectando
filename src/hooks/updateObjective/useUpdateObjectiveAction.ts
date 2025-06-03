import { useActionState, useTransition, useEffect, useCallback } from "react";
import { updateObjectiveAction } from "@/app/actions/objective/updateObjective";
import { UpdateObjectiveFormData } from "@/types/Objective";

/**
 * @description A custom hook that provides functionality to update an objective.
 * It manages the state of the update action, handles transitions, and updates the editable state.
 *
 * @param setIsEditable - A function to set the editable state of the objective.
 *
 * @returns An object containing:
 * - `state`: The current state of the update action.
 * - `isPending`: A boolean indicating if the update action is in progress.
 * - `executeAction`: A function to execute the update action with the provided data.
 */
export const useUpdateObjectiveAction = (
  setIsEditable: (value: boolean) => void
) => {
  const [state, action] = useActionState(updateObjectiveAction, null);
  const [isPending, startTransition] = useTransition();

  const executeAction = useCallback(
    async (data: UpdateObjectiveFormData) => {
      startTransition(() => {
        action(data);
      });
    },
    [action]
  );

  useEffect(() => {
    if (state === null) return;

    if (state.success) {
      setIsEditable(false);
    }
  }, [state, setIsEditable]);

  return {
    state,
    isPending,
    executeAction,
  };
};
