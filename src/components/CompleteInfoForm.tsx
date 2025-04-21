"use client";

// Cn is a utility function for conditional class names
import { cn } from "@/lib/utils";

// Zod library for schema validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation schema for the form
import { completeInfoSchema } from "@/lib/formSchemas/completeInfoSchema";

// Shadcn UI components for form elements
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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

export function CompleteInfoForm() {
    // Mock data for selects - replace with actual data in production
    const divisions = ["Corporativo", "Operaciones", "Comercial", "TI"];
    const businessUnits = ["Matriz", "Sucursal Norte", "Sucursal Sur", "Desarrollo"];
    const areas = [
        { id: "1", name: "Recursos Humanos" },
        { id: "2", name: "Finanzas" },
        { id: "3", name: "Desarrollo de Software" },
        { id: "4", name: "Marketing" }
    ];
    const bosses = [
        { id: "1", name: "Juan Pérez" },
        { id: "2", name: "María González" },
        { id: "3", name: "Carlos Rodríguez" }
    ];

    const form = useForm<z.infer<typeof completeInfoSchema>>({
        resolver: zodResolver(completeInfoSchema),
        defaultValues: {
            employeeNumber: "",
            email: "",
            fullName: "",
            bossId: "",
            division: "",
            businessUnitId: "",
            companySeniority: "",
            positionSeniority: "",
            areaId: "",
            position: "",
            companyContribution: ""
        }
    });

    function onSubmit(data: z.infer<typeof completeInfoSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-row items-start justify-between mb-4 gap-12">
                    <div className="flex flex-col gap-6 mb-4 w-1/3">
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
                                            type="number"
                                            min="1"
                                        />
                                    </FormControl>
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
                                        <Input placeholder="Escribe tu nombre completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>División</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una división" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {divisions.map((division) => (
                                                <SelectItem key={division} value={division}>
                                                    {division}
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
                            name="companySeniority"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Antigüedad en la Empresa</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal bg-gray-50 py-3 px-5 border-gray-400 h-12 text-xs","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "dd/MM/yyyy")
                                                    ) : (
                                                        <span>Selecciona una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Selecciona la fecha de inicio en la empresa
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="areaId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Área de Trabajo</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un área" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {areas.map((area) => (
                                                <SelectItem key={area.id} value={area.id}>
                                                    {area.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-6 mb-4 w-1/3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="email"
                                            placeholder="Escribe tu correo electrónico" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bossId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jefe Directo</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un jefe" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {bosses.map((boss) => (
                                                <SelectItem key={boss.id} value={boss.id}>
                                                    {boss.name}
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
                            name="businessUnitId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unidad de Negocio</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una unidad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {businessUnits.map((unit, index) => (
                                                <SelectItem key={index} value={(index + 1).toString()}>
                                                    {unit}
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
                            name="positionSeniority"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Antigüedad en el puesto</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal bg-gray-50 py-3 px-5 border-gray-400 h-12 text-xs","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "dd/MM/yyyy")
                                                    ) : (
                                                        <span>Selecciona una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Selecciona la fecha de inicio en tu puesto actual
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Puesto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el nombre de tu puesto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-1/3">
                        <FormField
                            control={form.control}
                            name="companyContribution"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contribución</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Escribe cómo contribuye tu puesto a la estrategia de GEMSO" 
                                            {...field}
                                            className="min-h-32" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Guardar Información</Button>
                </div>
            </form>
        </Form>
    );
}