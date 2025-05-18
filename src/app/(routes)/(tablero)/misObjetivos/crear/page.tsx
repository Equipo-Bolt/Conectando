"use server";

//* Next Cookies
import { cookies } from "next/headers";

// Load Data
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { getUserById } from "@/lib/fetches/user/getUserById";
import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";

// Custom Components
import CreateObjectiveForm from "@/components/bolt/Inputs/CreateObjectiveForm";

// Types
import { TypeClassification } from "@/types/TypeClassification";
import { TypeUser } from "@/types/TypeUser";

async function PaginaParaCrearObjetivo() {
  //* Usando cookies
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  const user: TypeUser = await getUserById(Number(userId));
  const formId : string =  await getFormIdByUserId(user.id);
  const classifications: TypeClassification[] = await getAllClassifications(); // Cambia el ID según sea necesario
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Crear Objetivo</h1>
      <p className="text-base mb-6">
        Colaborador: {user ? user.fullName : "N/A"}
      </p>
      <CreateObjectiveForm classifications={classifications} formId = { Number(formId) }/>
    </div>
  );
}

export default PaginaParaCrearObjetivo;
