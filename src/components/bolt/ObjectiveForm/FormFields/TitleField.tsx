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
import { RequiredIndicator } from "@/components/bolt/ObjectiveForm/RequiredIndicator";

interface TitleFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * @description A React component that renders a form field for entering the title of an objective.
 * It includes a label, input field, and validation message, with support for editable and required states.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the field is editable.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited. conditions.
 *
 * @returns {JSX.Element} The rendered TitleField component.
 */
export const TitleField = ({
  control,
  isEditable,
  required,
  editable,
}: TitleFieldProps) => {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Título del Objetivo
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              maxLength={60}
              disabled={!isEditable || !editable}
              placeholder="Ingrese el título del objetivo"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
