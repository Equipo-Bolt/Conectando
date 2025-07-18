import NavLinks from "@/components/bolt/Sidebars/navlinks";
import Image from "next/image";
import GemsoBlanco from "@/../public/GemsoBlanco.png";

import { auth } from "@/app/auth";
import { getUserById } from "@/lib/fetches/user/getUserById";
import { getRoleById } from "@/lib/fetches/role/getRoleById";
import { User } from "@/types/User";

export default async function SideNav() {
    const session = await auth();
    const user: User = await getUserById(Number(session?.user?.id));
    const role = await getRoleById(user.roleID);

  return (
    <div className="bg-gemso-dark-blue flex h-full flex-col px-3 py-4 md:px-2">
      <div className="justify-center mb-[2rem] hidden md:flex">
        <Image
          src={GemsoBlanco}
          alt="Gemso Blanco Logo"
          width={180}
          height={60}
        />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {role && (
          <NavLinks userRole={role} />
        )}
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
