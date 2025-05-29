"use client";
import { useRouter } from "next/navigation";
export interface GoBackProps {
  route: string;
}
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
/**
 * A React component that renders a clickable "Go Back" button.
 * When clicked, it navigates to the specified route using the Next.js router.
 *
 * @description This component is designed to provide a simple navigation mechanism
 *              for going back to a specified route. It uses the `useRouter` hook
 *              from Next.js for route navigation and displays an arrow icon.
 *
 * @param {GoBackProps} props - The props for the GoBack component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 *
 * @returns {JSX.Element} A clickable div containing an arrow icon.
 */
const GoBack = ({ route }: GoBackProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(route);
      }}
      className="cursor-pointer"
    >
      {" "}
      <ArrowLeftIcon className="h-[2rem] w-[2rem] text-black" />
    </div>
  );
};

export default GoBack;
