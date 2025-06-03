interface FormStatusProps {
  state: any;
  isPending: boolean;
}

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
