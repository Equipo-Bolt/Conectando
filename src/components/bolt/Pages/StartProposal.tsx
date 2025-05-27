import StartProposalButton from "@/components/bolt/Buttons/StartProposalButton";

import { cookies } from "next/headers";
import { auth } from "@/app/auth";

export default async function StartProposal() {
  //* Using Coookies
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  // const session = await auth();
  // const userId = session?.user?.id;
  return (
    <div>
      <div className="shadow-md rounded-lg p-[1rem] text-center w-3/4 mx-auto">
        <p className="mb-2">Bienvenido al nuevo inicio de año 2026.</p>
        <p>
          Para iniciar tu nueva propuesta de objetivo, presione el siguiente
          botón.
        </p>
      </div>

      <div className="text-center mt-6">
        <StartProposalButton userId={Number(userId)} />
      </div>
    </div>
  );
}
