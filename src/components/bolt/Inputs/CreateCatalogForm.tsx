"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState, useCallback } from "react";
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
} from "@/components/ui/form";

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import CancelButton from "@/components/bolt/Buttons/CancelButton";

// Types
import { BusinessUnit } from "@/types/BusinessUnit";
import { Area } from "@/types/Area";
import { Division } from "@/types/Division";

// Schemas
import { createCatalogSchema, createBusinessUnitSchema } from "@/lib/formSchemas/catalogSchema";

type CatalogType = "Area" | "División" | "Unidad de Negocio";

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
  const [currentCatalogType, setCurrentCatalogType] = useState<CatalogType>("Unidad de Negocio");

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
  const [divisionState, divisionAction] = useActionState(createDivisionAction, null);
  const [businessUnitState, businessUnitAction] = useActionState(createBusinessUnitAction, null);
  
  const [isPending, startTransition] = useTransition();

  // Get current state based on catalog type
  const getCurrentState = useCallback(() => {
    switch (currentCatalogType) {
      case "Area": return areaState;
      case "División": return divisionState;
      case "Unidad de Negocio": return businessUnitState;
      default: return null;
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
          divisionId: parsedData.data.divisionId
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
        if (currentCatalogType === "Area") {
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
      // Redirect to appropriate page based on catalog type
      const redirectPath = currentCatalogType === "Area" ? "/areas" :
                          currentCatalogType === "División" ? "/divisiones" :
                          "/unidades-negocio";
      router.push(redirectPath);
    } else {
      console.error("Error creating catalog:", currentState);
    }
  }, [router, currentCatalogType, getCurrentState]);

  const currentState = getCurrentState();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear Catálogo</h1>
      
      {/* Status Messages */}
      {isPending ? (
        <p className="text-blue-600 mb-4">Enviando...</p>
      ) : currentState?.success === true ? (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800 border border-green-200">
          {currentState.message}
        </div>
      ) : currentState?.success === false ? (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800 border border-red-200">
          {currentState?.error}
        </div>
      ) : null}

      {/* Catalog Type Selection */}
      <div className="mb-6">
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
            <SelectItem value="Area">Área</SelectItem>
            <SelectItem value="División">División</SelectItem>
            <SelectItem value="Unidad de Negocio">Unidad de Negocio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Fields */}
      {currentCatalogType && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      placeholder={`Título del ${currentCatalogType.toLowerCase()}`}
                      {...field}
                    />
                  </FormControl>
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