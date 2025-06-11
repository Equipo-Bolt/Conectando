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
import { calculateGrade } from "@/utils/ObjectiveFormUtils/calculateGrade";
import { UpdateObjectiveFormData } from "@/types/Objective";

interface FormValues {
  grade: number;
  weight: number;
  finalGrade: number;
}

interface FinalGradeFieldProps {
  control: Control<UpdateObjectiveFormData>;
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
  const grade = useWatch<UpdateObjectiveFormData>({ control, name: "grade" });
  // const weight = useWatch({ control, name: "weight" });

  // const result = calculateGrade(grade, weight);

  const multiplier =
        grade != null && grade in gradeMultipliers
          ? parseFloat((gradeMultipliers[Number(grade)] * 100).toFixed(2)).toString() + "%"
          : "S/C";

  return (
        <FormItem>
          <FormLabel>Calificación</FormLabel>
          <FormControl>
            <Input disabled={true} value={multiplier} readOnly />
          </FormControl>
          <FormMessage />
        </FormItem>
  );
};
