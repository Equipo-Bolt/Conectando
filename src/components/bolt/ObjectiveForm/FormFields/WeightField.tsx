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
 * Limited to maximum 3 digits.
 *
 * @param control - The control object used for managing the form state.
 * @param isEditable - A boolean indicating whether the field is editable.
 * @param required - A boolean indicating whether the field is required.
 * @param editable - A boolean indicating whether the field can be edited.
 *
 * @returns {JSX.Element} The rendered WeightField component.
 */
export const WeightField = ({
  control,
  isEditable,
  required,
  editable,
}: WeightFieldProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const value = e.target.value;

    if (value === "" || /^\d{1,3}$/.test(value)) {
      onChange(value);
    }
  };

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
              placeholder="1-100"
              onChange={(e) => handleInputChange(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
