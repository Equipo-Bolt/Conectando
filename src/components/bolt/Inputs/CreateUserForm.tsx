"use client";

// React and Next.js
import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";
import CancelButton from "@/components/bolt/Buttons/CancelButton";

// Types
import { CreateUserFormData } from "@/types/User";
import { Role } from "@/types/Role";

// Actions
import { createUserAction } from "@/app/actions/user/createUser";

//* Interface
interface CreateUserFormProps {
  roles: Role[];
}

//! This definition of props is crucial, otherwise it will throw Intrinsic atributes error
export function CreateUserForm(props: CreateUserFormProps) {
  
    const router = useRouter();

    const form = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserSchema),
      defaultValues: {
        email: "",
        roleID: "",
      },
    });
  
    const [state, newAction] = useActionState(createUserAction, null)
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(data: CreateUserFormData) {

        const parsedData = createUserSchema.safeParse(data);
        if (!parsedData.success) {
            console.error("Validation errors:", parsedData.error.format());
            return;
        }

        const userData: CreateUserFormData = {
            email: parsedData.data.email,
            roleID: parsedData.data.roleID,
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

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {isPending ? (
            <p className="text-blue-600">Enviando...</p>
          ) : state ?.success ? (
            <h1>Resultado: { state.message } </h1>
          ) : (
            <></>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Correo Electrónico del Usuario<p className="text-gemso-red"> *</p>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca el correo electrónico del usuario"
                    type="email"
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
                Roles<p className="text-gemso-red"> *</p>
                </FormLabel>
                <Select
                onValueChange={field.onChange}
                >
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {props.roles.map((role) => (
                    <SelectItem
                        key={role.id}
                        value={role.id.toString()}
                    >
                        {role.title}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />

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
