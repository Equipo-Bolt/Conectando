import NavLinks from "@/components/bolt/Sidebars/navlinks";
import Image from "next/image";
import GemsoBlanco from "../../../../public/GemsoBlanco.png";

export default function SideNav() {
  return (
    <div className="bg-gemso-dark-blue flex h-full flex-col px-3 py-4 md:px-2">
      <div className="justify-center mb-20 hidden md:flex">
        <Image
          src={GemsoBlanco}
          alt="Gemso Blanco Logo"
          width={180}
          height={60}
        />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
