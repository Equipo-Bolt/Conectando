"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeUserInfoSchema } from "@/lib/Schemas/formSchemas/userSchema";

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
import { CompleteUserFormData } from "@/types/User";
import { Role } from "@/types/Role";
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";

// Actions
import { completeUserInfoAction } from "@/app/actions/user/completeUserInfo";

// Date formatter
import { format } from "date-fns";

// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";
import { es } from "date-fns/locale";
import { FormStatus } from "../ObjectiveForm/FormStatus";

//* Interface
interface CompleteUserFormProps {
  roles: Role[];
  divisions: Division[];
  areas: Area[];
  businessUnits: BusinessUnit[];
  bosses: User[];
  user: User;
}

//! This definition of props is crucial, otherwise it will throw Intrinsic attributes error
export function CompleteInfoForm(props: CompleteUserFormProps) {
  const router = useRouter();

  // Get initial division ID based on user's business unit
  const initialDivisionID = useMemo(() => {
    if (!props.user.businessUnitID) return "";
    const userBusinessUnit = props.businessUnits.find(bu => String(bu.id) === String(props.user.businessUnitID));
    return userBusinessUnit ? String(userBusinessUnit.divisionID) : "";
  }, [props.user.businessUnitID, props.businessUnits]);

  const form = useForm<CompleteUserFormData>({
    resolver: zodResolver(completeUserInfoSchema),
    defaultValues: {
      id: props.user.id,
      email: props.user.email || "",
      roleID: props.user.roleID?.toString() || "",
      employeeNumber: props.user.employeeNumber?.toString() || "",
      fullName: props.user.fullName || "",
      bossID: props.user.bossID?.toString() || "",
      divisionID: initialDivisionID,
      businessUnitID: props.user.businessUnitID?.toString() || "",
      companySeniority: props.user.companySeniority?.toDateString() || "",
      positionSeniority: props.user.positionSeniority?.toDateString() || "",
      areaID: props.user.areaID?.toString() || "",
      position: props.user.jobPosition || "",
      companyContribution: props.user.companyContribution || "",
    },
  });

  const [state, newAction] = useActionState(completeUserInfoAction, null);
  const [isPending, startTransition] = useTransition();

  const currentDivision = form.watch("divisionID");

  // Filter business units based on selected division
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

  async function handleSubmit(data: CompleteUserFormData) {
    const parsedData = completeUserInfoSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Validation errors:", parsedData.error.format());
      return;
    }

    const userData: CompleteUserFormData = {
      id: parsedData.data.id,
      email: parsedData.data.email,
      roleID: String(parsedData.data.roleID),
      employeeNumber: String(parsedData.data.employeeNumber),
      fullName: parsedData.data.fullName,
      bossID: String(parsedData.data.bossID),
      divisionID: String(parsedData.data.divisionID),
      businessUnitID: String(parsedData.data.businessUnitID),
      companySeniority: parsedData.data.companySeniority,
      positionSeniority: parsedData.data.positionSeniority,
      areaID: String(parsedData.data.areaID),
      position: parsedData.data.position,
      companyContribution: parsedData.data.companyContribution,
    };

    await startTransition(() => {
      newAction(userData);
    });
  }

  useEffect(() => {
    if (state === null) return;
    else if (state.success) {
      const userRoleID = form.getValues("roleID");
      if (userRoleID === "1") {
        router.push("/misObjetivos");
      } else if (userRoleID === "2" || userRoleID === "4") {
        router.push("/misColaboradores");
      } else {
        router.push("/usuarios");
      }
    } else {
      console.error("Error creating user:", state);
    }
  }, [state, router, form]);

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        {/* Form Status */}
        <FormStatus isPending={isPending} state={state} />
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
                      disabled={true}
                      {...field}
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
                  <FormLabel>
                    Número de Empleado<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormLabel>
                    Fecha de inicio en la Empresa
                    <span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between [&_svg:not([class*='size-'])]:size-6 px-[1rem]",
                            !field.value && "text-muted-foreground px-[1rem]"
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
                  <FormLabel>
                    División<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormLabel>
                    Área de Trabajo<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                    Roles
                    <span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.roles.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>
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
                  <FormLabel>
                    Nombre Completo<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormLabel>
                    Fecha de inicio en el puesto
                    <span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between px-[1rem] [&_svg:not([class*='size-'])]:size-6",
                            !field.value && "text-muted-foreground px-[1rem]"
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
                        captionLayout="dropdown"
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
              name="businessUnitID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Unidad de Negocio<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormLabel>
                    Jefe Directo<span className="text-gemso-red"> *</span>
                  </FormLabel>

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
                  <FormLabel>
                    Puesto<span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Escribe el nombre de tu puesto"
                      maxLength={255}
                      {...field}
                      onChange={(e) => handleLeadingOrTrailingSpaces(e.target.value, "position")}
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
                  <FormLabel>
                    Contribución<span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                      maxLength={511}
                      {...field}
                      className="min-h-[8.5rem] max-h-[19rem] w-full resize-none"
                      onChange={(e) => handleLeadingOrTrailingSpaces(e.target.value, "companyContribution")}
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
          <CancelButton route="./login" text="Cancelar" />
          <SubmitButton text="Actualizar" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}

export default CompleteInfoForm;