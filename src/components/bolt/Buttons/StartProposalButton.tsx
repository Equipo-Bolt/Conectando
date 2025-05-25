"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createFormAction } from "@/app/actions/form/createForm";

export default function StartProposalButton({ userId }: { userId: number }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    const result = await createFormAction(null, userId);

    if (result.success) {
      router.refresh();
    } else {
      setError(result.error); // Saves the error to display it
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button variant={"gemso_yellow"} onClick={handleClick}>
        Iniciar mi propuesta de objetivos
      </Button>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
