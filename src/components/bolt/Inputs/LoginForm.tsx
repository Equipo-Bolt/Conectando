import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-[1.5rem]", className)} {...props}>
        <div className="flex flex-col items-start gap-2 text-center">
            <h1 className="text-2xl font-bold">Inicio de Sesión</h1>
            <p className="text-balance text-sm text-muted-foreground">
                Por favor ingresa tu correo electrónico para acceder a la página.
            </p>
        </div>
        <div className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <Button type="submit" className="w-full h-[3rem] mb-[1.5rem]" variant={"gemso_blue"}>
                Iniciar Sesión
            </Button>
        </div>
    </form>
  )
}
