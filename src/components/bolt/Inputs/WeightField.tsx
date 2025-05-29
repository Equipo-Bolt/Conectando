"use client";

import { useForm } from "react-hook-form";
import { useActionState, useTransition, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updateObjectiveClassificationAction } from "@/app/actions/objective_classification/updateObjectiveClassification";

interface WeightFieldProps {
  id: number;
  initialWeight?: number;
  onWeightChange?: (id: number, newWeight: number) => void;
}

export default function WeightField({
  id,
  initialWeight,
  onWeightChange,
}: WeightFieldProps) {
  // Local state to hold input weight value as string
  const [weight, setWeight] = useState<string>("");

  // Local state to show success or error messages temporarily
  const [visibleMessage, setVisibleMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Initialize weight from initialWeight prop on mount or when it changes
  useEffect(() => {
    if (typeof initialWeight === "number" && initialWeight > 0) {
      setWeight(initialWeight.toString());
    } else {
      setWeight("");
    }
  }, [initialWeight]);

  // Hook for managing action state and dispatching updates
  const [state, dispatch] = useActionState(
    updateObjectiveClassificationAction,
    null
  );

  // React concurrent mode transition hook to handle async state updates
  const [isPending, startTransition] = useTransition();

  // react-hook-form setup with default values
  const form = useForm({
    defaultValues: {
      weight: initialWeight,
    },
  });

  // Handler to allow only numeric input for weight
  const handleWeightChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setWeight(value);
    }
  };

  // Effect to update visibleMessage based on state changes,
  // and clear it after 5 seconds
  useEffect(() => {
    if (state?.success) {
      setVisibleMessage({ type: "success", text: state.message });
      const timer = setTimeout(() => setVisibleMessage(null), 3000);
      return () => clearTimeout(timer);
    } else if (state?.error) {
      setVisibleMessage({ type: "error", text: state.error });
      const timer = setTimeout(() => setVisibleMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // On blur event: dispatch the update action if not pending and weight is valid
  const handleBlur = () => {
    if (isPending || weight === "") return;

    const parsedWeight = parseInt(weight, 10);
    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      if (onWeightChange) {
        onWeightChange(id, parsedWeight);
      }
      startTransition(() => {
        dispatch({ id, weight: parsedWeight });
      });
    }
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormField
            name="weight"
            render={() => (
              <FormItem className="flex flex-row items-center w-full">
                <FormLabel className="w-3/16">
                  Peso de clasificación:{" "}
                </FormLabel>
                <FormControl className="w-[7rem] h-[1.5rem] rounded-md border border-gray-800">
                  <Input
                    value={weight}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    onBlur={handleBlur}
                    disabled={isPending}
                    min={1}
                    max={100}
                    placeholder="1–100"
                  />
                </FormControl>
                <p>%</p>
                <FormMessage />
                {/* Conditionally render the visible message with reserved space */}
                {visibleMessage ? (
                  <p
                    className={`text-xs ml-[0.5rem] ${
                      visibleMessage.type === "success"
                        ? "text-green-700"
                        : "text-red-500"
                    }`}
                  >
                    {visibleMessage.text}
                  </p>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
