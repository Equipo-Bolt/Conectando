import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface ButtonProps {
    route: string;
    text: string;

}

export default function CancelButton ( { route, text }: ButtonProps) {

    return (
        <Button type="submit" className={`bg-white text-gemso-blue border-3 border-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-lg hover:bg-gemso-blue/3`} asChild>
            <Link href={route}>
                {text}
            </Link>
        </Button>
    );
}