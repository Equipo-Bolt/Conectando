"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
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
import { useRouter } from "next/navigation";
import Image from "next/image";


// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/formSchemas/loginSchema"

import { Login } from "@/types/Login";

// * Actions
import { loginAction } from "@/app/actions/auth/login";

// * Assets
import GemsoStacked from "@/../../public/Login-GEMSO.png";

//! NOT OFFICIAL NOR FINAL PAGE JUST TESTING OTP
export default function LoginForm() {
  const router = useRouter();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  const [state, newAction] = useActionState(loginAction, null)
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: Login) => {
    // Validate the form data
    const parsedData = loginSchema.safeParse(data);

    startTransition(() => {
      newAction( { email : String(parsedData.data?.email), otp: Number(111111) })
    })
  }

  // * If User matched otp, enter app
  useEffect(()=> {
    if (state?.success === true) {
      router.push("/misObjetivos");
    }
  }, [state, router])

  return (
    <Card className="md:w-1/3 w-1/2 flex flex-col items-center justify-center p-[2rem] opacity-150">
      <CardHeader className="w-full text-center">
        <Image
          src={GemsoStacked}
          alt="Gemso Logo"
          width={200}
          className="mx-auto mb-4"
        />
        <CardDescription>Ingresa tu correo electrónico <br/>para acceder a CONECTANDO+.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">
                    Correo
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
            Verificar OTP
          </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}