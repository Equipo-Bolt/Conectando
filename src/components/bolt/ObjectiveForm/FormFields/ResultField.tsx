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

interface ResultFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * @description A React component that renders a form field for capturing a result description.
 * It includes a label, a textarea input, and validation messages.
 * The component supports conditional editing and required field indication.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the form is being edited or not.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited.
 *
 * @returns A JSX element representing the result field form component.
 */
export const ResultField = ({
  control,
  isEditable,
  required,
  editable,
}: ResultFieldProps) => {
  return (
    <FormField
      control={control}
      name="result"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Resultado
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Textarea
              maxLength={511}
              {...field}
              value={field.value || ""}
              disabled={!isEditable || !editable}
              placeholder="Describa el resultado obtenido"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
