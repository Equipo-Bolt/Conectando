import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./navlinks";

export default function SideNav() {
  return (
    <div className="bg-gemso-blue flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
