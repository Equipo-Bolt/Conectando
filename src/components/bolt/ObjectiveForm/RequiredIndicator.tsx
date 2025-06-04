interface RequiredIndicatorProps {
  show: boolean;
}

/**
 * @description A component that displays a red asterisk (*) to indicate a required field
 * if the `show` prop is true. Otherwise, it renders nothing.
 *
 * @param show - A boolean indicating whether the required indicator should be displayed.
 */
export const RequiredIndicator = ({ show }: RequiredIndicatorProps) => {
  return show ? <span className="text-red-500 ml-1">*</span> : null;
};
