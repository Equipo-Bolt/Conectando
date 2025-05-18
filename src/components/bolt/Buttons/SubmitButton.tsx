import { Button } from "@/components/ui/button";

export interface ButtonProps {
    text: string;
    isPending: boolean;
}

export default function SubmitButton( {text, isPending}: ButtonProps) {

    return (
        <Button type="submit" disabled={isPending} className="bg-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-lg hover:bg-gemso-blue/90">{text}</Button>
    );
}