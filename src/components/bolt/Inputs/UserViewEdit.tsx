"use client";

import { useActionState, useTransition, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/lib/Schemas/formSchemas/userSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import { UpdateUserFormData, User } from "@/types/User";
import { Division } from "@/types/Division";
import { Role } from "@/types/Role";
import { BusinessUnit } from "@/types/BusinessUnit";
import { Area } from "@/types/Area";
import { updateUserAction } from "@/app/actions/user/updateUser";
import { format } from "date-fns";
import { es } from "date-fns/locale";
// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Loader } from 'lucide-react';

interface DetailUserProps {
  user: UpdateUserFormData;
  divisions: Division[];
  roles: Role[];
  businessUnits: BusinessUnit[];
  bosses: User[];
  areas: Area[];
  userInfoView: boolean;
}

export default function UserViewEdit({
  user,
  divisions,
  roles,
  businessUnits,
  bosses,
  areas,
  userInfoView,
}: DetailUserProps) {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [state, newAction] = useActionState(updateUserAction, null);
  const [isPending, startTransition] = useTransition();

  // Get initial division ID based on user's business unit
  const initialDivisionID = useMemo(() => {
    if (!user.businessUnitID) return "";
    const userBusinessUnit = businessUnits.find(bu => String(bu.id) === String(user.businessUnitID));
    return userBusinessUnit ? String(userBusinessUnit.divisionID) : "";
  }, [user.businessUnitID, businessUnits]);

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      email: user.email || "",
      roleID: String(user.roleID) || "",
      employeeNumber: user.employeeNumber?.toString() || "",
      fullName: user.fullName || "",
      bossID: user.bossID?.toString() || "",
      divisionID: initialDivisionID,
      businessUnitID: user.businessUnitID?.toString() || "",
      companySeniority: user.companySeniority || "",
      positionSeniority: user.positionSeniority || "",
      areaID: user.areaID?.toString() || "",
      position: user.position || "",
      companyContribution: user.companyContribution || "",
    },
  });

  const currentDivision = form.watch("divisionID");

  // Filter business units based on selected division
  const filteredBusinessUnits = useMemo(() => {
    if (!currentDivision) return businessUnits;
    return businessUnits.filter(bu => bu.divisionID === parseInt(currentDivision));
  }, [currentDivision, businessUnits]);

  const handleDivisionChange = (value: string) => {
    form.setValue("divisionID", value);
    // Clear business unit when division changes
    form.setValue("businessUnitID", "");
  };

  const handleBusinessUnitChange = (value: string) => {
    form.setValue("businessUnitID", value);
    
    // Auto-set division based on business unit selection
    const selectedBusinessUnit = businessUnits.find(bu => String(bu.id) === value);
    if (selectedBusinessUnit) {
      form.setValue("divisionID", String(selectedBusinessUnit.divisionID));
    }
  };

  const handleSubmit = (data: UpdateUserFormData) => {
    const parsedData = updateUserSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Validation errors:", parsedData.error.format());
      return;
    }
    startTransition(() => newAction(data));
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditable(false);
  };

  // Handle successful form submission
  useEffect(() => {
    if (state?.success) {
      setIsEditable(false);
      router.push(`/usuarios/detalles/${user.id}`);
    }
  }, [state, router, user.id]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="w-12 h-12 animate-spin text-gemso-blue" />
        <p className="loading text-gemso-blue">Cargando...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Status Messages */}
        {isPending && <p className="text-blue-600">Enviando...</p>}
        {state?.success && <h1>Resultado: {state.message}</h1>}

        <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3">
          {/* First Column */}
          <div className="flex flex-col gap-[1rem]">
            {/* Email Field */}
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
                      disabled={!isEditable}
                      placeholder="ejemplo@gemso.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>              )}
            />

            {/* Employee Number Field */}
            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Empleado</FormLabel>

                  <FormControl>
                    <Input
                      disabled={!isEditable}
                      placeholder="Escribe tu número de empleado"
                      {...field}
                      type="number"
                      min={1}
                      maxLength={10}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>              )}
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
                          disabled={!isEditable}
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
                </FormItem>              )}
            />

            {/* Division Field */}
            <FormField
              control={form.control}
              name="divisionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>División</FormLabel>

                  <Select
                    onValueChange={handleDivisionChange}
                    value={field.value}
                    disabled={!isEditable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una división" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisions.map((division) => (
                        <SelectItem key={division.id} value={String(division.id)}>
                          {division.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>              )}
            />

            {/* Area Field */}
            <FormField
              control={form.control}
              name="areaID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Trabajo</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un área" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={String(area.id)}>
                          {area.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>              )}
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-[1rem]">
            {/* Role Field */}
            <FormField
              control={form.control}
              name="roleID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Roles<span className="text-gemso-red"> *</span>
                  </FormLabel>

                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>              )}
            />

            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>

                  <FormControl>
                    <Input
                      disabled={!isEditable}
                      placeholder="Escribe tu nombre completo"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>              )}
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
                          disabled={!isEditable}
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
                        defaultMonth={
                          field.value ? new Date(field.value) : new Date()
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>



                  <FormMessage />
                </FormItem>              )}
            />

            {/* Business Unit Field */}
            <FormField
              control={form.control}
              name="businessUnitID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad de Negocio</FormLabel>

                  <Select
                    onValueChange={handleBusinessUnitChange}
                    value={field.value}
                    disabled={!isEditable}
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
                </FormItem>              )}
            />

            {/* Boss Field */}
            <FormField
              control={form.control}
              name="bossID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jefe Directo</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un jefe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bosses.map((boss) => (
                        <SelectItem key={boss.id} value={String(boss.id)}>
                          {boss.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>              )}
            />
          </div>

          {/* Third Column */}
          <div className="flex flex-col gap-[1rem]">
            {/* Position Field */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puesto</FormLabel>

                  <FormControl>
                    <Input
                      disabled={!isEditable}
                      placeholder="Escribe el nombre de tu puesto"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>              )}
            />

            {/* Company Contribution Field */}
            <FormField
              control={form.control}
              name="companyContribution"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contribución</FormLabel>

                  <FormControl>
                    <Textarea
                      disabled={!isEditable}
                      placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                      {...field}
                      className="min-h-[8.5rem] max-h-[19rem] w-full resize-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 w-full">
          {isEditable ? (
            <>
              <Button
                variant="gemso_white_and_blue"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar edición
              </Button>
              <SubmitButton text="Guardar Cambios" isPending={isPending} />
            </>
          ) : (
            userInfoView && (
              <Button
                type="button"
                variant="gemso_blue"
                onClick={() => setIsEditable(true)}
              >
                Editar Usuario
              </Button>
            )
          )}
        </div>
      </form>
    </Form>
  );
}
