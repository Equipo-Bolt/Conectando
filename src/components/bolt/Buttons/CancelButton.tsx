import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface ButtonProps {
  route: string;
  text: string;
}

export default function CancelButton({ route, text }: ButtonProps) {
  return (
    <Button type="submit" variant={"gemso_white_and_blue"} asChild>
      <Link href={route}>{text}</Link>
    </Button>
  );
}
