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

interface ResultFieldProps {
  control: Control<UpdateObjectiveFormData>;
  isEditable: boolean;
  required: boolean;
  editable: boolean;
}

export const ResultField = ({
  control,
  isEditable,
  required,
  editable,
}: ResultFieldProps) => {
  return (
    <FormField
      control={control}
      name="result"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Resultado
            <RequiredIndicator show={isEditable && required} />
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={field.value || ""}
              disabled={!isEditable || !editable}
              placeholder="Describa el resultado obtenido"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
