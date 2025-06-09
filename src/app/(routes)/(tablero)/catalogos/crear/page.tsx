import GoBack from "@/components/bolt/Buttons/GoBack";
import CreateCatalogForm from "@/components/bolt/Inputs/CreateCatalogForm";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";

export default async function CreateCatalogPage() {
  const divisions = await getAllDivisions();
  return (
        <div>
          <div className="flex items-center gap-x-2 mb-[1rem]">
                <GoBack route={"/catalogos"} />
                <h1 className="text-3xl font-bold">Crear Entrada de Catálogo</h1>
            </div>
          <CreateCatalogForm divisions={divisions}/>
        </div>
  );
}