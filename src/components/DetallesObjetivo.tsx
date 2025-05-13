"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CancelButton from "./CancelButton";
import { TypeObjective } from "@/types/TypeObjective";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Props {
  objetivo: TypeObjective;
  classificationTitle: string;
}

export default function DetallesObjetivoClient({ objetivo, classificationTitle }: Props) {
  const form = useForm({
    defaultValues: {
      title: objetivo.title,
      weight: objetivo.weight.toString(),
      classification: objetivo.title,
      goal: objetivo.goal ?? "",
    },
  });

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Detalles del Objetivo</h1>
      <p className="text-base">
        <strong>Colaborador:</strong> Daniel Fernández
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Parte izquierda: formulario */}
        <div className="md:col-span-2 space-y-6">
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Objetivo</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clasificación</FormLabel>
                    <FormControl>
                      <Select disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={classificationTitle} />
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (%)</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Parte derecha: comentarios */}
        <div className="space-y-4 border-l pl-4">
          <h2 className="text-lg font-semibold">Comentarios</h2>
          {objetivo.comments && objetivo.comments.length > 0 ? (
            objetivo.comments.map((c, i) => (
              <div key={i} className="border rounded p-3 bg-gray-50 text-sm">
                <strong>John</strong>{" "}
                <span className="text-gray-500">{c.commentedAt?.toDateString()}</span>
                <p>{c.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Sin comentarios</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 w-full">
        <button className="bg-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-m text-white hover:bg-gemso-blue/90">
          Editar Objetivo
        </button>
        <CancelButton route="/misObjetivos" text="Regresar" />
      </div>
    </div>
  );
}
