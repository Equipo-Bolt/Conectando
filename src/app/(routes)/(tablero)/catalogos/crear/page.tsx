import CreateCatalogForm from "@/components/bolt/Inputs/CreateCatalogForm";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";

export default async function CreateCatalogPage() {
  const divisions = await getAllDivisions();
  return (
    <CreateCatalogForm divisions={divisions}/>
  );
}