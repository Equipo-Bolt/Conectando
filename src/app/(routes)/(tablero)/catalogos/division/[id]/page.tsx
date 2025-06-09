import GoBack from "@/components/bolt/Buttons/GoBack";
import { EditCatalogForm } from "@/components/bolt/Inputs/EditCatalogForm";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getDivisionById } from "@/lib/fetches/division/getDivisionById";

export default async function EditDivisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const divisionParams = await params;
    const divisionId = Number(divisionParams.id);
    const divisions = await getAllDivisions();
    const division = await getDivisionById(divisionId);
    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center gap-x-2 mb-[1rem]">
                <GoBack route={"/catalogos"} />
                <h1 className="text-3xl font-bold">Editar División</h1>
            </div>
            <EditCatalogForm
                divisions={divisions}
                catalogType="División"
                data={division}
            />
        </div>
    );
}

