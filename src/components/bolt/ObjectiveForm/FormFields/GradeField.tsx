import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
 * @description A React component that renders a grade select field within a form.
 * This field allows users to select a numeric grade between 1 and 5.
 * The field can be configured to be editable or non-editable, and it supports validation
 * for required fields.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the form is being edited or not.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited.
 *
 * @returns {JSX.Element} The rendered grade select field component.
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
            <Select
              value={field.value?.toString() || ""}
              onValueChange={(value) => field.onChange(value)}
              disabled={!isEditable || !editable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
