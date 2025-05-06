"use client";

// React and Next.js
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";


// Form Validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createObjectiveSchema } from "@/lib/formSchemas/createObjectiveSchema";

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

// Custom Components
import SubmitButton from "@/components/SubmitButton";
import CancelButton from "@/components/CancelButton"; 
// Types
import { MutateObjectiveInfo } from "@/types/TypeObjective";
import { TypeClassification } from "@/types/TypeClassification";

// Actions
import { createObjectiveAction } from "@/app/actions/objective/createObjective";

//* Interface
interface CreateObjectiveFormProps {
    classifications: TypeClassification[];
}

type ObjectiveFormData = z.infer<typeof createObjectiveSchema>;

                                //! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CreateObjectiveForm({ classifications }: CreateObjectiveFormProps) { {
    const router = useRouter();

    const form = useForm<ObjectiveFormData>({
      resolver: zodResolver(createObjectiveSchema),
      defaultValues: {
        title: "",
        weight: "",
        classification: "",
        goal: "",
      },
    });
  
    const [state, newAction] = useActionState(createObjectiveAction, null) //* pones la action aqui
    const [isPending, startTransition] = useTransition();
  
  
    return (
        <Form {...form}>
          <form onSubmit={
            form.handleSubmit(async (data) => {
                // Validate the form data
                const parsedData = createObjectiveSchema.safeParse(data);
                if (!parsedData.success) {
                    console.error("Validation errors:", parsedData.error.format());
                    return;
                }

                const objectiveData: MutateObjectiveInfo = {
                    formID: 1, //! default 1, form6 no tiene objs
                    title: data.title,
                    weight: parseInt(data.weight),
                    classificationCatalogID: parseInt(data.classification),
                    goal: data.goal,
                    result: null,
                };
                // Call the action to create the objective
                await startTransition(() => newAction(objectiveData));

                if (state === "Objetivo Creado") {
                    router.push("/misObjetivos"); // Redirect to the objectives page
                }
            }
          )}
          className="space-y-6">
            {isPending ? <p className="text-blue-600">Enviando...</p> : <h1>Resultado: {state}</h1>}
            {/* Título del objetivo */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Objetivo<p className="text-gemso-red"> *</p></FormLabel>
                  <FormControl>
                    <Input placeholder="Introduzca el título del objetivo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
  
            {/* Peso y Clasificación */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (%)<p className="text-gemso-red"> *</p></FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            max="100" min="1" 
                            placeholder="Introduzca el peso del objetivo" {...field}
                        />
                    </FormControl>
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clasificación<p className="text-gemso-red"> *</p></FormLabel>
                    <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {classifications.map((classification) => (
                                <SelectItem key={classification.id} value={classification.id.toString()}>
                                {classification.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
  
            {/* Meta */}
            <FormField
              control={form.control}
              name="goal"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Introduzca su meta" {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
  
            {/* Botones */}
            <div className="flex justify-end gap-4 pt-2">
                <CancelButton route="./" text="Cancelar" />
                <SubmitButton text="Crear Objetivo" />
            </div>
          </form>
        </Form>
    );
  };
}
  
export default CreateObjectiveForm;
  