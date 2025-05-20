"use client";

import { useForm } from 'react-hook-form';
import { useActionState, useTransition, useState } from 'react';

import { Input } from '@/components/ui/input';
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
}

export default function WeightField({id, initialWeight}: WeightFieldProps) {
  const [weight, setWeight] = useState(initialWeight || 0);
  const [state, dispatch] = useActionState(updateObjectiveClassificationAction, null);
  const [isPending, startTransition] = useTransition();
    const form = useForm({
        defaultValues: {
        weight: 0,
        }, 
    });

  // Update weight when input changes
  const handleWeightChange = (value: string) => {
    const numericValue = value === "" ? 1 : parseInt(value, 10);
    setWeight(numericValue);
  };

  // Submit form when input loses focus
  const handleBlur = () => {
    if (isPending) return; // Prevent multiple clicks

    startTransition(() => {
      dispatch({ id, weight });
    });
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form >
          <FormField
            name="weight"
            render={() => (
              <FormItem className='flex flex-row items-center w-full'>
                <FormLabel className='w-3/16'>Peso de categoría: </FormLabel>
                <FormControl className='w-3/16 h-[1.5rem] rounded-md border border-gray-800'>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    onBlur={handleBlur}
                    disabled={isPending}
                    min={1}
                    max={100}
                  />
                </FormControl>
                <p>%</p>
                <FormMessage />
                    {state?.success ? (
                        <p className="text-green-500 text-xs ml-[0.5rem]">
                            {state.message}
                        </p>
                    ) : (
                        <p className="text-red-500 text-xs ml-[0.5rem]">
                            {state?.error}
                        </p>
                    )}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isPending && <p className="text-sm text-muted-foreground">Saving...</p>}
    </div>
  );
}