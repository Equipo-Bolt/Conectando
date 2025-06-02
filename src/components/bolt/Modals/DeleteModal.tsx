"use client"

import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog"

//* Este es universal modal de eliminar, se le pueden pasar los props que necesite el modal
interface DeleteModalProps {
    id: number
    icon: React.ReactNode
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    description: string
    cancelText?: string
    confirmText?: string
    handleConfirm: () => void
  }
  
  export function DeleteModal({
    icon,
    open,
    setOpen,
    title,
    description,
    cancelText = "Cancelar",
    confirmText = "Eliminar",
    handleConfirm,
  }: DeleteModalProps) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="flex flex-col items-center justify-center w-[35rem] gap-8">
          <AlertDialogHeader className="text-center space-y-2">
            <div className="flex justify-center">
              {icon}
            </div>
            <AlertDialogTitle className="text-3xl font-bold text-center">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-[25rem] text-wrap text-base text-muted-foreground text-center">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogCancel className="bg-white text-gemso-blue border-2 border-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-base hover:bg-gemso-blue/9 cursor-pointer">
              {cancelText}
            </AlertDialogCancel>
  
            <AlertDialogAction onClick={handleConfirm} className="bg-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-base hover:bg-gemso-blue/90 cursor-pointer">
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  