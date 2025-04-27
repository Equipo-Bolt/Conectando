import { Button } from "@/components/ui/button";

export interface ButtonProps {
    onSubmit: () => void;
    text: string;

}

export default function SubmitButton( { onSubmit, text }: ButtonProps) {

    return (
        <Button type="submit" className="bg-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-lg hover:bg-gemso-blue/90" onClick={onSubmit}>{text}</Button>
    );
}