import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWatch, Control } from "react-hook-form";
import { gradeMultipliers } from "@/types/GradeMultipliers";

interface FinalGradeFieldProps {
  control: Control<any>;
}

/**
 * @description The `FinalGradeField` component is a form field that calculates and displays the final grade
 * based on the selected grade and weight. It uses the `useWatch` hook to observe changes in the form's
 * control values for "grade" and "weight", computes the result using a predefined grade multiplier, and
 * renders the result in a read-only input field.
 *
 * @param control - The control object provided by the form, used to manage and observe form state.
 */
export const FinalGradeField = ({ control }: FinalGradeFieldProps) => {
  const grade = useWatch({ control, name: "grade" });
  const weight = useWatch({ control, name: "weight" });
  const multiplier = gradeMultipliers[grade];
  const result = weight * multiplier;

  return (
    <FormField
      control={control}
      name="Final Grade"
      render={() => (
        <FormItem>
          <FormLabel>Puntaje Ponderado</FormLabel>
          <FormControl>
            <Input disabled={true} value={result} readOnly />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
