"use client"

// React and Next.js
import { useActionState, useTransition, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/formSchemas/otpSchema";
import { OtpSchemaType } from "@/types/OTP";

// Actions  
import { loginAction } from "@/app/actions/auth/login";
import { findUserAction } from "@/app/actions/auth/findUser";
import { hasCompletedInfoAction } from "@/app/actions/user/hasCompletedInfo";

// NextAuth


// ! For nextAuth implementation, Backend needs email related to otp
export default function OtpForm(
    { propEmail }: { propEmail: string } = { propEmail: "" } // Default value for email
) {
    const router = useRouter();

    const form = useForm<OtpSchemaType>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email: String(propEmail || ""),
            otp: "",
        },
    })

    const [state, newAction] = useActionState(loginAction, null)
    const [isPending, startTransition] = useTransition();
    
    const onSubmit = async (data: OtpSchemaType) => {
        const parsedData = otpSchema.safeParse(data);
        
        if (parsedData.success) {
            startTransition(() => {
                newAction(parsedData.data);
            });
        }
    };

    const checkUserInfo = useCallback(async (email: string) => {
        const response = await hasCompletedInfoAction(email);
        if (response.success) {
            // If user has all fields filled, redirect to objectives page
            router.push("/misObjetivos");
        } else {
            // If user has not completed all fields, redirect to info status page
            router.push("/llenarInformacion");
        }
    }, [router]);

    useEffect(() => {
        if (state?.success === true) {
            checkUserInfo(form.getValues("email"));
        }
    }, [state, form, checkUserInfo]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center justify-center">
                        <FormLabel className="text-gemso-blue text-lg font-semibold mb-[0.5rem]">
                            Autenticación de dos pasos
                        </FormLabel>
                        <FormControl>
                            <InputOTP maxLength={6} id="otp" {...field}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSeparator />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
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
                    Enviar
                </Button>
                <Button
                    type="button"
                    variant="link"
                    className="w-full text-xs h-[1rem] text-gemso-blue cursor-pointer hover:text-gemso-blue/80"
                    onClick={() => findUserAction(null, form.getValues("email"))}
                    >
                        ¿No recibiste el código? Reenviar OTP
                </Button>

            </form>
        </Form>
    )
}
