"use client";

// React and Next.js
import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

// Form Validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateObjectiveSchema } from "@/lib/formSchemas/createObjectiveSchema";

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
import CancelButton from "@/components/bolt/Buttons/CancelButton";

// Types
import { MutateObjective } from "@/types/Objective";
import { Classification } from "@/types/Classification";
import { Comment } from "@/types/Comment";

// Actions
import { updateObjectiveAction } from "@/app/actions/objective/updateObjective";

interface DetailObjectivesProps {
  objective: MutateObjective;
  classifications: Classification[];
  comments: Comment[] | undefined;
}

type ObjectiveFormData = z.infer<typeof updateObjectiveSchema>;

export default function EditObjective({
  objective,
  classifications,
  comments,
}: DetailObjectivesProps) {
  const router = useRouter();
  console.log(
    "id: " + String(classifications[objective.classificationCatalogID - 1].id)
  );

  const form = useForm<ObjectiveFormData>({
    resolver: zodResolver(updateObjectiveSchema),
    defaultValues: {
      id: objective.id,
      title: objective.title,
      weight: objective.weight.toString(),
      classification: String(objective.classificationCatalogID),
      goal: objective.goal ?? "",
    },
  });

  const [state, newAction] = useActionState(updateObjectiveAction, null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(data: ObjectiveFormData) {
    console.log("handleSubmit triggered with data:", data);

    const parsedData = updateObjectiveSchema.safeParse(data);
    if (!parsedData.success) {
      console.log("Validation errors:", parsedData.error.format());
      return;
    }

    const objectiveData: MutateObjective = {
      id: data.id,
      formID: 2,
      title: data.title,
      weight: parseInt(data.weight),
      classificationCatalogID: parseInt(data.classification),
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
      router.push("/misObjetivos");
    } else {
      console.log("Error updating objective:", state.error);
    }
  }, [state, router]);

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Detalles del Objetivo</h1>
      <p className="text-base">
        <strong>Colaborador:</strong> Daniel Fernández
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Forms */}
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
                <h1>Resultado: {state.message} </h1>
              ) : (
                <>Error: {state?.error}</> //! Added this should be change woth error pop up
              )}
              <div className="grid grid-cols-1 gap-6">
                {/* Objective Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Objetivo</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <Textarea {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 w-full">
                <SubmitButton text="Guardar" isPending={isPending} />
                <CancelButton route="/misObjetivos" text="Regresar" />
              </div>
            </form>
          </Form>
        </div>

        {/* Right Sections: Comments */}
        <div className="space-y-4 border-l pl-4">
          <h2 className="text-lg font-semibold">Comentarios</h2>
          {comments && comments.length > 0 ? (
            comments.map((c, i) => (
              <div key={i} className="border rounded p-3 bg-gray-50 text-sm">
                <strong>John</strong>{" "}
                <span className="text-gray-500">
                  {c.commentedAt?.toDateString()}
                </span>
                <p>{c.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Sin comentarios</p>
          )}
        </div>
      </div>
    </div>
  );
}
