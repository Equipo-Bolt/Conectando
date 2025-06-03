import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { UpdateObjectiveFormData } from "@/types/Objective";
import { RequiredIndicator } from "../RequiredIndicator";

interface GoalFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

export const GoalField = ({
  control,
  isEditable,
  required,
  editable,
}: GoalFieldProps) => {
  return (
    <FormField
      control={control}
      name="goal"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Meta
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={field.value || ""}
              disabled={!isEditable || !editable}
              placeholder="Describa la meta del objetivo"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
