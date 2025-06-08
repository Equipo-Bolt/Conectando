"use client";

// React and Next.js
import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createObjectiveSchema } from "@/lib/formSchemas/objectiveSchema";

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
import { CreateObjectiveFormData } from "@/types/Objective";
import { Classification } from "@/types/Classification";

// Actions
import { createObjectiveAction } from "@/app/actions/objective/createObjective";

//* Interface
interface CreateObjectiveFormProps {
  classifications: Classification[];
  formId: number;
}

//! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CreateObjectiveForm(props: CreateObjectiveFormProps) {
  const router = useRouter();

  const form = useForm<CreateObjectiveFormData>({
    resolver: zodResolver(createObjectiveSchema),
    defaultValues: {
      title: "",
      weight: "",
      classification: "",
      goal: "",
      result: null,
    },
  });

  const [state, newAction] = useActionState(createObjectiveAction, null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(data: CreateObjectiveFormData) {
    const parsedData = createObjectiveSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Validation errors:", parsedData.error.format());
      return;
    }

    const objectiveData: CreateObjectiveFormData = {
      formID: props.formId,
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
      router.push("./");
    } else {
      console.error("Error creating objective:", state);
    }
  }, [state, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {isPending ? (
          <p className="text-blue-600">Enviando...</p>
        ) : state?.success ? (
          <h1>Resultado: {state.message} </h1>
        ) : (
          <></>
        )}
        {/* Objective Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Título del Objetivo<p className="text-gemso-red"> *</p>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduzca el título del objetivo"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Weight and Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Peso (%)<p className="text-gemso-red"> *</p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    max="100"
                    min="1"
                    placeholder="Introduzca el peso del objetivo"
                    {...field}
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
                <FormLabel>
                  Clasificación<p className="text-gemso-red"> *</p>
                </FormLabel>
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
                    {props.classifications.map((classification) => (
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
        </div>

        {/* Goal */}
        <FormField
          control={form.control}
          name="goal"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Introduzca su meta"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <CancelButton route="./" text="Cancelar" />
          <SubmitButton text="Crear Objetivo" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}

export default CreateObjectiveForm;
