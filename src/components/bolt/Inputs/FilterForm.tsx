"use client";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/formSchemas/userSchema";

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
  FormMessage,
} from "@/components/ui/form";

// Types
import { CreateUserFormData } from "@/types/User";
import { Role } from "@/types/Role";
import { BusinessUnit } from "@/types/BusinessUnit";



//* Interface
interface FilterFormProps {
  roles: Role[];
  businessUnits: BusinessUnit[];
}
//! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function FilterForm(props: FilterFormProps) {

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      roleID: "",
      fullName: "",
      businessUnitID: "",
    },
  });


  

  return (
    <Form {...form}>
      <form>
        <div className="flex flex-row gap-[1rem] items-start">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Escribe un nombre"
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="roleID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Roles
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
                      {props.businessUnits.map((bu) => (
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

      </form>
    </Form>
  );
}

export default FilterForm;
