"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateObjectiveSchema } from "@/lib/formSchemas/objectiveSchema";

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import { Button } from "@/components/ui/button";
// Types
import { UpdateObjectiveFormData } from "@/types/Objective";
import { Classification } from "@/types/Classification";
import { Comment } from "@/types/Comment";

// Actions
import { updateObjectiveAction } from "@/app/actions/objective/updateObjective";

interface DetailObjectivesProps {
  objective: UpdateObjectiveFormData;
  classifications: Classification[];
  comments: Comment[] | undefined;
}

export default function ObjectiveForm({
  objective,
  classifications,
}: DetailObjectivesProps) {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const form = useForm<UpdateObjectiveFormData>({
    resolver: zodResolver(updateObjectiveSchema),
    defaultValues: {
      id: objective.id,
      title: objective.title,
      weight: objective.weight.toString(),
      classification: objective.classification,
      goal: objective.goal ?? "",
      result: objective.result ?? null,
    },
  });

  const [state, newAction] = useActionState(updateObjectiveAction, null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(data: UpdateObjectiveFormData) {
    console.log("handleSubmit triggered with data:", data);

    const parsedData = updateObjectiveSchema.safeParse(data);
    if (!parsedData.success) {
      console.log("Validation errors:", parsedData.error.format());
      return;
    }

    const objectiveData: UpdateObjectiveFormData = {
      id: data.id,
      formID: 2,
      title: data.title,
      weight: data.weight,
      classification: data.classification,
      goal: data.goal,
      result: null,
    };

    await startTransition(() => {
      newAction(objectiveData);
    });
  }

  useEffect(() => {
    if (state === null) return;
    else if (state.success) {
      setIsEditable(false);
    } else {
      console.log("Error updating objective:", state.error);
    }
  }, [state, router]);

  return (
    <div className="md:col-span-2 space-y-6">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            console.log("Form submitted");
            form.handleSubmit(handleSubmit)(e);
          }}
          className="space-y-6"
        >
          {isPending ? (
            <p className="text-blue-600">Guardando...</p>
          ) : state?.success ? (
            <h1>Resultado: {state.message}</h1>
          ) : state?.error ? (
            <p className="text-red-600">Error: {state.error}</p>
          ) : null}
          <div className="grid grid-cols-1 gap-6">
            {/* Objective Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Objetivo</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditable} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Objective Clasification */}
            <FormField
              control={form.control}
              name="classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Clasificación
                    <p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
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
                </FormItem>
              )}
            />

            {/* Objective Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (%)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditable} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Objective Goal */}
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    disabled={!isEditable}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 w-full">
            {isEditable ? (
              <>
                <SubmitButton text="Guardar Cambios" isPending={isPending} />
                <Button
                  variant={"gemso_white_and_blue"}
                  onClick={() => {
                    form.reset();
                    setIsEditable(false);
                  }}
                >
                  Cancelar edición
                </Button>
              </>
            ) : (
              <Button
                variant={"gemso_blue"}
                onClick={() => setIsEditable(true)}
              >
                Editar Objetivo
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
