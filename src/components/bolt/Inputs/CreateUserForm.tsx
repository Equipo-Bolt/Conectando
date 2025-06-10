"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState, useMemo } from "react";
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
import { es } from "date-fns/locale";

// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FormStatus } from "../ObjectiveForm/FormStatus";

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

  const currentDivision = form.watch("divisionID");

  // Filter business units based on selected division using useMemo
  const filteredBusinessUnits = useMemo(() => {
    if (!currentDivision) return props.businessUnits;
    return props.businessUnits.filter(bu => bu.divisionID === parseInt(currentDivision));
  }, [currentDivision, props.businessUnits]);

  const handleDivisionChange = (value: string) => {
    form.setValue("divisionID", value);
    // Clear business unit when division changes
    form.setValue("businessUnitID", "");
  };

  const handleBusinessUnitChange = (value: string) => {
    form.setValue("businessUnitID", value);
    
    // Auto-set division based on business unit selection
    const selectedBusinessUnit = props.businessUnits.find(bu => String(bu.id) === value);
    if (selectedBusinessUnit) {
      form.setValue("divisionID", String(selectedBusinessUnit.divisionID));
    }
  };

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

  // Handler to allow only numeric input for employee number
  const handleEmployeeNumberChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      form.setValue("employeeNumber", value);
    }
  }

  const handleLeadingOrTrailingSpaces = (value: string, formValue: "email" | "roleID" | "employeeNumber" | "fullName" | "bossID" | "divisionID" | "businessUnitID" | "companySeniority" | "positionSeniority" | "areaID" | "position" | "companyContribution") => {
    // Trim leading and trailing spaces from the input value
    form.setValue(formValue, value.trim());
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        {/* Form Status */}
        <FormStatus isPending={isPending} state={state} />

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3">
          <div className="flex flex-col gap-[1rem]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Correo Electrónico del Usuario
                    <span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="ejemplo@gemso.com"
                      type="email"
                      min={1}
                      maxLength={255}
                      {...field}
                        onChange={(e) => handleLeadingOrTrailingSpaces(e.target.value, "email")}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Empleado</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Escribe tu número de empleado"
                      {...field}
                      min={1}
                      maxLength={10}
                      onChange={(e) => handleEmployeeNumberChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySeniority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de inicio en la Empresa</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between px-[1rem] [&_svg:not([class*='size-'])]:size-6",
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
                        locale={es}
                        mode="single"
                        captionLayout="dropdown" // This enables year/month dropdowns
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
                        defaultMonth={
                          field.value ? new Date(field.value) : new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="divisionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>División</FormLabel>

                  <Select
                    onValueChange={handleDivisionChange}
                    value={field.value}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="areaID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Trabajo</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
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

                  <FormMessage />
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
                    Roles<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Escribe tu nombre completo"
                      maxLength={255}
                      {...field}
                      onChange={(e) =>
                        field.onChange(handleLeadingOrTrailingSpaces(e.target.value, "fullName"))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="positionSeniority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de inicio en el puesto</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between px-[1rem] [&_svg:not([class*='size-'])]:size-6",
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
                        locale={es}
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
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessUnitID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad de Negocio</FormLabel>

                  <Select
                    onValueChange={handleBusinessUnitChange}
                    value={field.value}
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

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bossID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jefe Directo</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
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

                  <FormMessage />
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

                  <FormControl>
                    <Input
                      placeholder="Escribe el nombre de tu puesto"
                      maxLength={255}
                      {...field}
                      onChange={(e) =>
                        field.onChange(handleLeadingOrTrailingSpaces(e.target.value, "position"))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyContribution"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contribución</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                      maxLength={511}
                      {...field}
                      className="min-h-[8.5rem] max-h-[19rem] w-full resize-none"
                      onChange={(e) =>
                        field.onChange(handleLeadingOrTrailingSpaces(e.target.value, "companyContribution"))
                      }
                    />
                  </FormControl>

                  <FormMessage />
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