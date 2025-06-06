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

interface WeightFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

/**
 * @description A React component that renders a form field for inputting a weight percentage.
 * The field is controlled via React Hook Form and includes validation and editability options.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the field is editable.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited. conditions.
 *
 * @returns {JSX.Element} The rendered WeightField component.
 */
export const WeightField = ({
  control,
  isEditable,
  required,
  editable,
}: WeightFieldProps) => {
  return (
    <FormField
      control={control}
      name="weight"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Peso (%)
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              disabled={!isEditable || !editable}
              placeholder="0-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
