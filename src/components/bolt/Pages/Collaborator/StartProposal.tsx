import StartProposalButton from "@/components/bolt/Buttons/StartProposalButton";

import { auth } from "@/app/auth";

export default async function StartProposal() {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <div>
      <div className="shadow-md rounded-lg p-[1rem] text-center w-3/4 mx-auto">
        <p className="mb-2">Le damos la bienvenida al nuevo inicio de año 2026.</p>
        <p>
          Para iniciar su nueva propuesta de objetivo, presione el siguiente
          botón.
        </p>
      </div>

      <div className="text-center mt-6">
        <StartProposalButton userId={Number(userId)} />
      </div>
    </div>
  );
}
