import { Button } from "@/components/ui/button";

export interface ButtonProps {
  text: string;
  isPending: boolean;
}

export default function SubmitButton({ text, isPending }: ButtonProps) {
  return (
    <Button type="submit" disabled={isPending} variant={"gemso_blue"} className="px-[1rem]">
      {text}
    </Button>
  );
}
