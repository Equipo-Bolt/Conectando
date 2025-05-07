"use server";

// Load Data
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { getUserById } from "@/lib/fetches/user/getUserById";

// Custom Components
import CreateObjectiveForm from "@/components/CreateObjectiveForm";

// Types
import { TypeClassification } from "@/types/TypeClassification";
import { TypeUser } from "@/types/TypeUser";

async function PaginaParaCrearObjetivo() {
  const user: TypeUser = await getUserById(8); //! default 1, Cambia el ID según sea necesario
  const classifications: TypeClassification[] = await getAllClassifications(); // Cambia el ID según sea necesario
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Crear Objetivo</h1>
      <p className="text-base mb-6">Colaborador: {user ? user.fullName : "N/A"}</p>
      <CreateObjectiveForm 
        classifications={classifications}
      />
    </div>
  );
};

export default PaginaParaCrearObjetivo;
