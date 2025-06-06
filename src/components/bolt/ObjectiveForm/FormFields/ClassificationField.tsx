import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { Classification } from "@/types/Classification";
import { RequiredIndicator } from "../RequiredIndicator";

interface ClassificationFieldProps {
  control: Control<UpdateObjectiveFormData>;
  classifications: Classification[];
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * A React component that renders a classification field within a form.
 * This field allows users to select a classification from a dropdown menu.
 *
 * @param control - The control object used for managing form state and validation.
 * @param classifications - An array of classification objects, each containing an `id` and `title`.
 * @param isEditable - A boolean indicating whether the form is being edited or not.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the dropdown should be enabled or disabled.
 *
 * @returns A JSX element representing the classification field.
 */
export const ClassificationField = ({
  control,
  classifications,
  isEditable,
  required,
  editable,
}: ClassificationFieldProps) => {
  return (
    <FormField
      control={control}
      name="classification"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Clasificación
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={!isEditable || !editable}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar clasificación" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {classifications.map((classification) => (
                <SelectItem
                  key={classification.id}
                  value={classification.id.toString()}
                >
                  {classification.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
