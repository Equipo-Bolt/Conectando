"use client";

// React and Next.js
import {
  useActionState,
  useTransition,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn Components
import { Input } from "@/components/ui/input";
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
  FormMessage,
} from "@/components/ui/form";

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import CancelButton from "@/components/bolt/Buttons/CancelButton";
import { FormStatus } from "@/components/bolt/ObjectiveForm/FormStatus";

// Types
import { Division } from "@/types/Division";

// Schemas
import {
  createCatalogSchema,
  createBusinessUnitSchema,
} from "@/lib/Schemas/formSchemas/catalogSchema";

type CatalogType = "Área" | "División" | "Unidad de Negocio";

// Actions (these should be imported from your actions directory)
import { createAreaAction } from "@/app/actions/area/createArea";
import { createDivisionAction } from "@/app/actions/division/createDivision";
import { createBusinessUnitAction } from "@/app/actions/business_unit/createBusinessUnit";

//* Interface
interface CreateCatalogFormProps {
  divisions: Division[];
}

export interface CreateCatalogFormData {
  title: string;
  divisionId?: string;
}

//! This definition of props is crucial, otherwise it will throw Intrinsic attributes error
export function CreateCatalogForm(props: CreateCatalogFormProps) {
  const router = useRouter();

  // State for catalog type selection
  const [currentCatalogType, setCurrentCatalogType] =
    useState<CatalogType>("Unidad de Negocio");

  // Get the appropriate schema based on catalog type
  const getSchema = () => {
    return currentCatalogType === "Unidad de Negocio"
      ? createBusinessUnitSchema
      : createCatalogSchema;
  };

  // Get default values based on catalog type
  const getDefaultValues = useCallback(() => {
    const baseValues = { title: "" };
    if (currentCatalogType === "Unidad de Negocio") {
      return { ...baseValues, divisionId: "" };
    }
    return baseValues;
  }, [currentCatalogType]);

  const form = useForm<CreateCatalogFormData>({
    resolver: zodResolver(getSchema()),
    defaultValues: getDefaultValues(),
  });

  // Individual action states for each catalog type
  const [areaState, areaAction] = useActionState(createAreaAction, null);
  const [divisionState, divisionAction] = useActionState(
    createDivisionAction,
    null
  );
  const [businessUnitState, businessUnitAction] = useActionState(
    createBusinessUnitAction,
    null
  );

  const [isPending, startTransition] = useTransition();

  // Get current state based on catalog type
  const getCurrentState = useCallback(() => {
    switch (currentCatalogType) {
      case "Área":
        return areaState;
      case "División":
        return divisionState;
      case "Unidad de Negocio":
        return businessUnitState;
      default:
        return null;
    }
  }, [currentCatalogType, areaState, divisionState, businessUnitState]);

  // Reset form when catalog type changes
  useEffect(() => {
    if (currentCatalogType) {
      form.reset(getDefaultValues());
    }
  }, [currentCatalogType, form, getDefaultValues]);

  // Handle form submission
  async function handleSubmit(data: CreateCatalogFormData) {
    startTransition(() => {
      // Prepare the correct data structure based on catalog type
      if (currentCatalogType === "Unidad de Negocio") {
        // For Business Unit, we need both title and divisionId
        const parsedData = createBusinessUnitSchema.safeParse(data);

        if (!parsedData.success) {
          console.error("Validation errors:", parsedData.error.format());
          return;
        }

        const businessUnitData = {
          title: parsedData.data.title,
          divisionId: parsedData.data.divisionId,
        };
        businessUnitAction(businessUnitData);
      } else {
        // For Area and Division, we only need the title
        const parsedData = createCatalogSchema.safeParse(data);

        if (!parsedData.success) {
          console.error("Validation errors:", parsedData.error.format());
          return;
        }

        const catalogData = { title: parsedData.data.title };

        // Call the appropriate action based on catalog type
        if (currentCatalogType === "Área") {
          areaAction(catalogData);
        } else if (currentCatalogType === "División") {
          divisionAction(catalogData);
        }
      }
    });
  }

  // Handle response for all catalog types
  useEffect(() => {
    const currentState = getCurrentState();
    if (currentState === null) return;

    if (currentState.success) {
      router.push("/catalogos");
    } else {
      console.error("Error creating catalog:", currentState);
    }
  }, [router, getCurrentState]);

  const currentState = getCurrentState();

  return (
    <div className="w-full">
      {/* Status Messages */}
      <FormStatus isPending={isPending} state={currentState}/>

      {/* Catalog Type Selection */}
      <div className="mb-[1rem]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Catálogo<span className="text-red-500"> *</span>
        </label>
        <Select
          onValueChange={(value: CatalogType) => setCurrentCatalogType(value)}
          value={currentCatalogType || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un catálogo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Área">Área</SelectItem>
            <SelectItem value="División">División</SelectItem>
            <SelectItem value="Unidad de Negocio">Unidad de Negocio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Fields */}
      {currentCatalogType && (
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Título<span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      maxLength={36}
                      placeholder={`Título del ${currentCatalogType.toLowerCase()}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Division ID Field (only for Business Unit) */}
            {currentCatalogType === "Unidad de Negocio" && (
              <FormField
                control={form.control}
                name="divisionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      División<span className="text-red-500"> *</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar división" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.divisions?.map((division) => (
                          <SelectItem
                            key={division.id}
                            value={String(division.id)}
                          >
                            {division.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <CancelButton route="./" text="Cancelar" />
              <SubmitButton
                text={`Crear ${currentCatalogType}`}
                isPending={isPending}
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default CreateCatalogForm;
