import {EditCatalogForm} from "@/components/bolt/Inputs/EditCatalogForm";
import { getAreaById } from "@/lib/fetches/area/getAreaById";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { get } from "http";

export default async function EditAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const areaParams = await params;
    const areaId = Number(areaParams.id);
    const divisions = await getAllDivisions();
    const area = await getAreaById(areaId);
    return (
        <div className="flex flex-col gap-[1rem]">
            <h1 className="text-3xl font-bold">Editar Área</h1>
            <EditCatalogForm
                divisions={divisions}
                catalogType="Área"
                data={area}
            />
        </div>
    );
}

