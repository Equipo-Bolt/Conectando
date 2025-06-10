"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeUserInfoSchema } from "@/lib/formSchemas/userSchema";

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

//* Interface
interface CompleteUserFormProps {
  roles: Role[];
  divisions: Division[];
  areas: Area[];
  businessUnits: BusinessUnit[];
  bosses: User[];
  user: User;
}
//! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CompleteInfoForm(props: CompleteUserFormProps) {
  const router = useRouter();

  const form = useForm<CompleteUserFormData>({
    resolver: zodResolver(completeUserInfoSchema),
    defaultValues: {
      id: props.user.id,
      email: props.user.email || "",
      roleID: props.user.roleID?.toString() || "",
      employeeNumber: props.user.employeeNumber?.toString() || "",
      fullName: props.user.fullName || "",
      bossID: props.user.bossID?.toString() || "",
      divisionID: props.user.divisionID?.toString() || "",
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
        (bu) => bu.divisionID === parseInt(currentDivision || "0")
      );
      setFilteredBusinessUnits(filtered);
      form.setValue("businessUnitID", String(filtered[0]?.id) || "");
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
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
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
                    Número de Empleado<p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe tu número de empleado"
                      {...field}
                      type="number"
                      min={1}
                      maxLength={10}
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
                    <p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
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
              name="divisionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    División<p className="text-gemso-red"> *</p>
                  </FormLabel>
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
                    Área de Trabajo<p className="text-gemso-red"> *</p>
                  </FormLabel>
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
                    <p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
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
                    Nombre Completo<p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe tu nombre completo"
                      {...field}
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
                    <p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
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
                            <span className="px-[1rem]">
                              Selecciona una fecha
                            </span>
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
                  <FormLabel>
                    Unidad de Negocio<p className="text-gemso-red"> *</p>
                  </FormLabel>
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
                    Jefe Directo<p className="text-gemso-red"> *</p>
                  </FormLabel>
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
                    Puesto<p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe el nombre de tu puesto"
                      {...field}
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
                    Contribución<p className="text-gemso-red"> *</p>
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                      {...field}
                      className="min-h-[8.5rem] max-h-[19rem] w-full resize-none"
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
