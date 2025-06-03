interface RequiredIndicatorProps {
  show: boolean;
}

export const RequiredIndicator = ({ show }: RequiredIndicatorProps) => {
  return show ? <span className="text-red-500 ml-1">*</span> : null;
};
