"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// Esquema de validación
const objectiveSchema = z.object({
  title: z.string().min(1, "El título del objetivo es requerido"),
  weight: z.number({ invalid_type_error: "Debe ser un número" }).min(0).max(100),
  classification: z.string().min(1, "Seleccione una clasificación"),
  goal: z.string().min(1, "La meta es requerida"),
});

type ObjectiveFormData = z.infer<typeof objectiveSchema>;

const PaginaParaCrearObjetivo = () => {
  const form = useForm<ObjectiveFormData>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: {
      title: "",
      weight: 0,
      classification: "",
      goal: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
    
    
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Crear Objetivo</h1>
      <p className="text-base mb-6">Colaborador: Daniel Fernández</p>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Título del objetivo */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del Objetivo</FormLabel>
                <FormControl>
                  <Input placeholder="Introduzca el título del objetivo" {...field} />
                </FormControl>
                <FormMessage />
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
                  <FormLabel>Peso (%)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" placeholder="Introduzca el peso del objetivo" {...field} className="pr-12" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-600">%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clasificación</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="negocio">Negocio/División</SelectItem>
                        <SelectItem value="individual">Individual de Negocio</SelectItem>
                        <SelectItem value="gente">Gente</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Meta */}
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta</FormLabel>
                <FormControl>
                  <Textarea placeholder="Introduzca su meta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="h-[3rem] w-32 rounded-lg text-base font-normal border border-gemso-blue text-gemso-blue hover:bg-gray-100"
              onClick={() => { /* Navegar atrás o resetear formulario */ }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="h-[3rem] w-40 rounded-lg text-base font-normal bg-gemso-blue text-white hover:bg-gemso-blue/90"
            >
              Crear Objetivo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaginaParaCrearObjetivo;
