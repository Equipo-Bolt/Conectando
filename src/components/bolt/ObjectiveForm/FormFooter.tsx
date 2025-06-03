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

/**
 * A functional component that renders the footer of a form with action buttons.
 * The buttons displayed depend on the `isEditable` and `showEditButton` props.
 *
 * @param {boolean} isEditable - Determines if the form is in an editable state.
 *                                If true, "Guardar" and "Cancelar" buttons are shown.
 * @param {boolean} isPending - Indicates if an action is currently pending.
 *                               Disables buttons when true.
 * @param {boolean} showEditButton - Controls the visibility of the edit button
 *                                   when the form is not editable.
 * @param {string} editButtonText - The text to display on the edit button.
 * @param {() => void} onEdit - Callback function triggered when the edit button is clicked.
 * @param {() => void} onCancel - Callback function triggered when the cancel button is clicked.
 *
 * @returns {JSX.Element} A JSX element containing the form footer with appropriate buttons.
 */
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
