import { useActionState, useTransition, useEffect, useCallback } from "react";
import { updateObjectiveAction } from "@/app/actions/objective/updateObjective";
import { UpdateObjectiveFormData } from "@/types/Objective";

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
