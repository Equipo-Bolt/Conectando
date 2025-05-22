"use client"

// React and Next.js
import { useActionState, useTransition } from "react";
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
import { otpSchema, OtpSchemaType } from "@/lib/formSchemas/otpSchema"

// Actions  
//import { verifyOtpAction } from "@/app/actions/user/verifyOtp"
import { createObjectiveAction } from "@/app/actions/objective/createObjective";

export default function OtpForm() {
    const router = useRouter();

    const form = useForm<OtpSchemaType>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            pin: "",
        },
    })

    const [state, newAction] = useActionState(createObjectiveAction, null)
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (data: OtpSchemaType) =>{
        // Validate the form data
        const parsedData = otpSchema.safeParse(data);

        startTransition(() => {
            newAction(parsedData)
        })

        // If the form data is valid, you navigate to the OTP page
        if (state?.success === true) {
            router.push("/misColaboradores");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center justify-center">
                        <FormLabel className="text-gemso-blue text-lg font-semibold mb-[0.5rem]">
                            Autenticación de dos pasos
                        </FormLabel>
                        <FormControl>
                            <InputOTP maxLength={6} {...field}>
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
                    Submit
                </Button>
            </form>
        </Form>
    )
}
