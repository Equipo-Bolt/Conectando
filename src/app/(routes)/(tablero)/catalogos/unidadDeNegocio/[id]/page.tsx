import GoBack from "@/components/bolt/Buttons/GoBack";
import {EditCatalogForm} from "@/components/bolt/Inputs/EditCatalogForm";
import { getBusinessUnitById } from "@/lib/fetches/business_unit/getBusinessUnitById";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";

export default async function EditBusinessUnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const businessUnitParams = await params;
    const businessUnitId = Number(businessUnitParams.id);
    const divisions = await getAllDivisions();
    const businessUnit = await getBusinessUnitById(businessUnitId);

    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center gap-x-2 mb-[1rem]">
                <GoBack route={"/catalogos"} />
                <h1 className="text-3xl font-bold">Editar Unidad de Negocio</h1>
            </div>
            <EditCatalogForm
                divisions={divisions}
                catalogType="Unidad de Negocio"
                data={businessUnit}
            />
        </div>
    );
}

