// 📁 components/ObjectiveForm/FormFields/GradeField.tsx
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
              min="0"
              max="5"
              step="1"
              {...field}
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
