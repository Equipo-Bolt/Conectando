import {
  useActionState,
  useTransition,
  useEffect,
  useCallback,
  useRef,
} from "react";
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
  setIsEditable: (value: boolean) => void,
  updateCurrentValues: (newValues: UpdateObjectiveFormData) => void // Nuevo parámetro
) => {
  const [state, action] = useActionState(updateObjectiveAction, null);
  const [isPending, startTransition] = useTransition();

  const lastSubmittedDataRef = useRef<UpdateObjectiveFormData | null>(null);

  const executeAction = useCallback(
    async (data: UpdateObjectiveFormData) => {
      lastSubmittedDataRef.current = data;
      startTransition(() => {
        action(data);
      });
    },
    [action]
  );

  useEffect(() => {
    if (state === null) return;

    if (state.success && lastSubmittedDataRef.current) {
      updateCurrentValues(lastSubmittedDataRef.current);
      setIsEditable(false);
      lastSubmittedDataRef.current = null;
    }
  }, [state, setIsEditable, updateCurrentValues]);

  return {
    state,
    isPending,
    executeAction,
  };
};
