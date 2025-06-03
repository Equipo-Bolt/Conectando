"use client"

import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogCancel, 
} from "@/components/ui/alert-dialog"

//* Este es universal modal de eliminar, se le pueden pasar los props que necesite el modal
interface ErrorModalProps {
    icon: React.ReactNode
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    description: string[]
    finishText?: string
}
  
  export function ErrorModal({
    icon,
    open,
    setOpen,
    title,
    description,
    finishText = "Aceptar",
  }: ErrorModalProps) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="flex flex-col items-center justify-center min-w-fit gap-[1rem] px-[4rem]">
          <AlertDialogHeader className="flex flex-col items-center justify-center text-center gap-[1rem]">
            <div className="flex justify-center">
              {icon}
            </div>
            <AlertDialogTitle className="text-3xl font-bold text-center w-auto">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-auto text-wrap text-base text-muted-foreground text-center gap-[0.5rem]">
                {description.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground items-center">
                    {item}
                </li>
                ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogCancel className="bg-gemso-blue text-primary-foreground shadow-xs hover:bg-gemso-blue/90 hover:cursor-pointer w-[10rem] h-[3rem] rounded-lg">
              {finishText}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  