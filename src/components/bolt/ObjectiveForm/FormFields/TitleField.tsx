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
