import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";

interface FormActionsProps {
  isEditable: boolean;
  isPending: boolean;
  showEditButton: boolean;
  editButtonText: string;
  onEdit: () => void;
  onCancel: () => void;
}

export const FormFooter = ({
  isEditable,
  isPending,
  showEditButton,
  editButtonText,
  onEdit,
  onCancel,
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 w-full">
      {isEditable ? (
        <>
          <SubmitButton text="Guardar" isPending={isPending} />
          <Button
            type="button"
            variant="gemso_white_and_blue"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </>
      ) : (
        showEditButton && (
          <Button type="button" variant="gemso_blue" onClick={onEdit}>
            {editButtonText}
          </Button>
        )
      )}
    </div>
  );
};
