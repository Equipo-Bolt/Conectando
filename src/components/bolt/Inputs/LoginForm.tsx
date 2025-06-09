"use client";

import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// React and Next.js
import { useActionState, useTransition, useEffect } from "react";
////import { useRouter } from "next/navigation";


// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/formSchemas/loginSchema"

import { Login } from "@/types/Login";

// * Actions
import { findUserAction } from "@/app/actions/auth/findUser";

interface LoginFormProps {
  onValueChange: (email: string) => void;
}

export default function LoginForm(
  { onValueChange }: LoginFormProps
) {
  ////const router = useRouter();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  const [state, newAction] = useActionState(findUserAction, null)
  const [isPending, startTransition] = useTransition();

const onSubmit = async (data: Login) => {
  // Validate the form data

  const parsedData = loginSchema.safeParse(data);

  if (parsedData.success) {
    startTransition(() => {
      newAction(parsedData.data.email);
    });
  }
};

// When state updates and is successful, call the parent callback
useEffect(() => {
  if (state?.success === true) {
    onValueChange(state.message);
  }
}, [state, onValueChange]);


  return (
    
    <Form {...form}>
      <form noValidate className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-center justify-center">
              <FormLabel className="text-gemso-blue text-lg font-semibold mb-[0.5rem]" htmlFor="email">
                  Correo Electrónico
              </FormLabel>
              <Input 
                id="email" 
                type="email"
                placeholder="ejemplo@gemso.com"
                {...field}
              />
              <FormMessage className="text-gemso-red text-sm mt-1"/>
              {/* Display error message if there was an error with action */}
              {state?.success === false && (
                <p className="text-gemso-red text-sm mt-1">
                  {state.error}
                </p>
              )}
            </FormItem>
          )}
        />
      <Button type="submit" className="w-full h-[3rem] mt-[0.5rem]" variant={"gemso_blue"} disabled={isPending}>
        Iniciar Sesión
      </Button>
      </form>
    </Form>
  )
}