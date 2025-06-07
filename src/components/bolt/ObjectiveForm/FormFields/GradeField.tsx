import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { RequiredIndicator } from "../RequiredIndicator";

interface GradeFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * @description A React component that renders a grade input field within a form.
 * This field allows users to input a numeric grade between 1 and 5, with a step of 1.
 * The field can be configured to be editable or non-editable, and it supports validation
 * for required fields.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the form is being edited or not.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited. conditions.
 *
 * @returns {JSX.Element} The rendered grade input field component.
 */
export const GradeField = ({
  control,
  isEditable,
  required,
  editable,
}: GradeFieldProps) => {
  return (
    <FormField
      control={control}
      name="grade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Puntaje
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              {...field}
              value={field.value || ""}
              disabled={!isEditable || !editable}
              placeholder="1 - 5"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
