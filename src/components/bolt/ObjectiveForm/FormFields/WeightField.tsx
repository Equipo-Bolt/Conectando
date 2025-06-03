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
              min="0"
              max="100"
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
