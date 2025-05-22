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
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";


// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/formSchemas/loginSchema"

// Actions
//import { loginUserAction} from "@/app/actions/user/loginUser";
import { createObjectiveAction } from "@/app/actions/objective/createObjective";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  const [state, newAction] = useActionState(createObjectiveAction, null)
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: LoginSchemaType) => {
    // Validate the form data
    const parsedData = loginSchema.safeParse(data);

    startTransition(() => {
      newAction(parsedData)
    })
    
    // If the form data is valid, you navigate to the OTP page
    if (state?.success === true) {
      router.push("/otp");
    } else {
      console.error(parsedData.error);
    }
  }

  return (
    
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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