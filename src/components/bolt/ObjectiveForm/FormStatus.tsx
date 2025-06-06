interface FormStatusProps {
  state: any;
  isPending: boolean;
}

/**
 * @description A functional component that displays the status of a form submission.
 * It shows different messages based on the `isPending`, `state.success`, or `state.error` properties.
 *
 * @param {FormStatusProps} props - The props for the component.
 * @param {boolean} props.isPending - Indicates whether the form submission is in progress.
 * @param {Object} [props.state] - The state object containing success or error information.
 * @param {boolean} [props.state.success] - Indicates if the form submission was successful.
 * @param {string} [props.state.message] - The success message to display.
 * @param {string} [props.state.error] - The error message to display if the submission failed.
 *
 * @returns {JSX.Element | null} A JSX element displaying the form status or null if no status is available.
 */
export const FormStatus = ({ state, isPending }: FormStatusProps) => {
  if (isPending) {
    return <p className="text-blue-600">Guardando...</p>;
  }

  if (state?.success) {
    return <p className="text-green-600">✓ {state.message}</p>;
  }

  if (state?.error) {
    return <p className="text-red-600">Error: {state.error}</p>;
  }

  return null;
};
