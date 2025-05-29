"use client";

// React
import { useState, useEffect } from "react";


// Cn is a utility function for conditional class names
import { cn } from "@/lib/utils";

// Zod library for schema validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation schema for the form
import { completeUserInfoSchema } from "@/lib/formSchemas/userSchema";

// Shadcn UI components for form elements
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Date formatter
import { format } from "date-fns";

// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";

//* Types
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";

//* Interface
interface CompleteInfoFormProps {
    divisions : Division[],
    areas : Area[],
    businessUnits : BusinessUnit[],
    bosses : User[]
}

//* Action
import { createUserActionDP } from "@/app/actions/user/createUserDP";
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import CancelButton from "@/components/bolt/Buttons/CancelButton";

                                //! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CompleteInfoForm({ divisions, areas, businessUnits, bosses } : CompleteInfoFormProps ) {

    const form = useForm<z.infer<typeof completeUserInfoSchema>>({
        resolver: zodResolver(completeUserInfoSchema),
        defaultValues: {
            employeeNumber: "",
            email: "",
            fullName: "",
            bossID: "",
            divisionID: "",
            businessUnitID: "",
            companySeniority: "",
            positionSeniority: "",
            areaID: "",
            position: "",
            companyContribution: ""
        }
    });

    const currentDivision = form.watch("divisionID");

    // Here we are using the useState hook to manage the state of the filtered business units
    const [filteredBusinessUnits, setFilteredBusinessUnits] = useState<BusinessUnit[]>([]);

    useEffect(() => {
        // This effect will run whenever the currentDivision changes
        const filtered = businessUnits.filter((bu) => bu.divisionID === parseInt(currentDivision));
        setFilteredBusinessUnits(filtered);
    }, [currentDivision, businessUnits]);


    return (
        <Form {...form}>
                <form 
                    onSubmit = {
                        /**
                         * ? Francisco Note: I am doing this because there was an issue receiving data to action
                         * ? so my solution was creating an object of FormData to assure all data is included, 
                         * ? but why do this if front could create instead an object of TypeUser here
                         * ! TLDR: Created FormData object in Front to send to Back, maybe create TypeUser instead
                        */
                        form.handleSubmit(async (values) => {
                            // Create a TypeUser object from the form values without using FormData
                            const user = {
                                employeeNumber: parseInt(values.employeeNumber),
                                email: values.email,
                                fullName: values.fullName,
                                bossId: parseInt(values.bossId),
                                businessUnitId: parseInt(values.businessUnitId),
                                companySeniority: format(new Date(values.companySeniority), "dd/MM/yyyy"),
                                positionSeniority: format(new Date(values.positionSeniority), "dd/MM/yyyy"),
                                areaId: parseInt(values.areaId),
                                position: parseInt(values.position),
                                companyContribution: values.companyContribution
                            };
                            
                            console.log("Form values JSON:", JSON.stringify(values));

                            await createUserActionDP(user);
                        })
                    }
                    className="space-y-4 flex flex-col gap-8"
                >
                    <div className="flex flex-row items-start justify-between gap-[6rem]">
                        <div className="flex flex-col gap-4 w-1/3  justify-between">
                            <FormField
                                control={form.control}
                                name="employeeNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Empleado<p className="text-gemso-red"> *</p></FormLabel>
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
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre Completo<p className="text-gemso-red"> *</p></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe tu nombre completo" {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="division"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>División<p className="text-gemso-red"> *</p></FormLabel>
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
                                                {divisions.map((division ) => (
                                                    <SelectItem key={division.id} value={String(division.id)}>
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
                                name="areaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Área de Trabajo<p className="text-gemso-red"> *</p></FormLabel>
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
                                                {areas.map((area) => (
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

                        <div className="flex flex-col  gap-4 w-1/3  justify-between">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo<p className="text-gemso-red"> *</p></FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email"
                                                placeholder="Escribe tu correo electrónico" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Puesto<p className="text-gemso-red"> *</p></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el nombre de tu puesto" {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bossId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jefe Directo<p className="text-gemso-red"> *</p></FormLabel>
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
                                                {bosses.map((boss) => (
                                                    <SelectItem key={boss.id} value={String(boss.id)}>
                                                        {boss.fullName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessUnitId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unidad de Negocio<p className="text-gemso-red"> *</p></FormLabel>
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
                            
                        </div>

                        <div className="flex flex-col  gap-4 w-1/3  justify-between">
                        <FormField
                                control={form.control}
                                name="companySeniority"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Fecha de inicio en la Empresa<p className="text-gemso-red"> *</p></FormLabel>
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
                                                        <CalendarIcon className="text-primary"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
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
                                name="positionSeniority"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Fecha de inicio en el puesto<p className="text-gemso-red"> *</p></FormLabel>
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
                                                        <CalendarIcon className="text-primary"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
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
                                name="companyContribution"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Contribución<p className="text-gemso-red"> *</p></FormLabel>
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
                    
                    <div className="grid grid-cols-3">
                        <div className="col-start-3 col-end-4 w-full justify-around flex pl-[4rem]">
                            <CancelButton route="/" text="Cancelar" />
                            <SubmitButton onSubmit={() => console.log(form.getValues())} text="Aceptar" />
                        </div>
                    </div>
                </form>
        </Form>
    );
}