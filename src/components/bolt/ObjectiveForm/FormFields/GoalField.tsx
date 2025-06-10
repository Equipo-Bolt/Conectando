import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { RequiredIndicator } from "../RequiredIndicator";

interface GoalFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * @description A React component that renders a form field for specifying a goal.
 * It includes a label, a textarea for input, and validation messages.
 * The component supports editable and required states.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the form is being edited or not.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited.
 *
 * @returns A JSX element representing the goal input field.
 */
export const GoalField = ({
  control,
  isEditable,
  required,
  editable,
}: GoalFieldProps) => {
  return (
    <FormField
      control={control}
      name="goal"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Meta
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Textarea
              maxLength={511}
              {...field}
              value={field.value || ""}
              disabled={!isEditable || !editable}
              placeholder="Describa la meta del objetivo"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
