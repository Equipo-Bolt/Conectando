"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/formSchemas/userSchema";

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import { Textarea } from "@/components/ui/textarea";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import CancelButton from "@/components/bolt/Buttons/CancelButton";

// Types
import { CreateUserFormData } from "@/types/User";
import { Role } from "@/types/Role";
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";

// Actions
import { createUserAction } from "@/app/actions/user/createUser";

// Date formatter
import { format } from "date-fns";

// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";

//* Interface
interface CreateUserFormProps {
  roles: Role[];
  divisions: Division[];
  areas: Area[];
  businessUnits: BusinessUnit[];
  bosses: User[];
}
//! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CreateUserForm(props: CreateUserFormProps) {
  const router = useRouter();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      roleID: "",
      employeeNumber: "",
      fullName: "",
      bossID: "",
      divisionID: "",
      businessUnitID: "",
      companySeniority: "",
      positionSeniority: "",
      areaID: "",
      position: "",
      companyContribution: "",
    },
  });

  const [state, newAction] = useActionState(createUserAction, null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(data: CreateUserFormData) {
    const parsedData = createUserSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Validation errors:", parsedData.error.format());
      return;
    }

    const userData: CreateUserFormData = {
      email: parsedData.data.email,
      roleID: parsedData.data.roleID.toString(),
      employeeNumber: parsedData.data.employeeNumber?.toString() || "",
      fullName: parsedData.data.fullName || "",
      bossID: parsedData.data.bossID?.toString() || "",
      divisionID: parsedData.data.divisionID?.toString() || "",
      businessUnitID: parsedData.data.businessUnitID?.toString() || "",
      companySeniority: parsedData.data.companySeniority || "",
      positionSeniority: parsedData.data.positionSeniority || "",
      areaID: parsedData.data.areaID?.toString() || "",
      position: parsedData.data.position || "",
      companyContribution: parsedData.data.companyContribution || "",
    };

    await startTransition(() => {
      newAction(userData);
    });
  }

  useEffect(() => {
    if (state === null) return;
    else if (state.success) {
      router.push("/usuarios");
    } else {
      console.error("Error creating user:", state);
    }
  }, [state, router]);

  // Here we are using the useState hook to manage the state of the filtered business units
  const [filteredBusinessUnits, setFilteredBusinessUnits] = useState<
    BusinessUnit[]
  >([]);

  const currentDivision = form.watch("divisionID");
  const currentBusinessUnit = form.watch("businessUnitID");

  useEffect(() => {
    // This effect will run whenever currentDivision or props.businessUnits change

    if (currentDivision === undefined || currentDivision === "") {
      // If no division is selected, reset the filtered business units
      setFilteredBusinessUnits(props.businessUnits);
      return;
    } else {
      // Filter the business units based on the selected division
      const filtered = props.businessUnits.filter(
        (bu) => bu.divisionID === parseInt(currentDivision || "0", 10)
      );
      setFilteredBusinessUnits(filtered);
      form.setValue("businessUnitID", filtered[0]?.id.toString() || "");
    }

  }, [currentDivision, props.businessUnits, form]);

  useEffect(() => {
    // Assign current Division to matching business units division
    if (currentBusinessUnit && currentBusinessUnit !== "") {
      const matchingBU = props.businessUnits.find(
        (bu) => bu.id === parseInt(currentBusinessUnit, 10)
      );
      if (matchingBU) {
        form.setValue("divisionID", String(matchingBU.divisionID));
      }
    }
  }, [currentBusinessUnit, props.businessUnits, form]);

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
        <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3">
          <div className="flex flex-col gap-[1rem]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Correo Electrónico del Usuario
                    <p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="ejemplo@gemso.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Empleado</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe tu número de empleado"
                      {...field}
                      type="number"
                      min="1"
                      
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySeniority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de inicio en la Empresa</FormLabel>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="text-primary" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="divisionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>División</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una división" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.divisions.map((division) => (
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

            <FormField
              control={form.control}
              name="areaID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Trabajo</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un área" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.areas.map((area) => (
                        <SelectItem key={area.id} value={String(area.id)}>
                          {area.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-[1rem]">
            <FormField
              control={form.control}
              name="roleID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Roles<p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe tu nombre completo"
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="positionSeniority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de inicio en el puesto</FormLabel>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="text-primary" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessUnitID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad de Negocio</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una unidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredBusinessUnits.map((bu) => (
                        <SelectItem key={bu.id} value={String(bu.id)}>
                          {bu.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bossID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jefe Directo</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un jefe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.bosses.map((boss) => (
                        <SelectItem key={boss.id} value={String(boss.id)}>
                          {boss.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puesto</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe el nombre de tu puesto"
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyContribution"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contribución</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                      {...field}
                      className="min-h-[9rem] max-h-[15rem] w-full resize-none"
                    />
                  </FormControl>

                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <CancelButton route="./" text="Cancelar" />
          <SubmitButton text="Crear Usuario" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}

export default CreateUserForm;
