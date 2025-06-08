import CreateCatalogForm from "@/components/bolt/Inputs/CreateCatalogForm";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";

export default async function CreateCatalogPage() {
  const divisions = await getAllDivisions();
  return (
        <div>
          <h1 className="text-3xl font-bold mb-[1rem]">Crear Catálogo</h1>
          <CreateCatalogForm divisions={divisions}/>
        </div>
  );
}