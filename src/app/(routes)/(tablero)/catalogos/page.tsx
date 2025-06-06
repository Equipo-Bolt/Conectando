import DivisionsCollapsible from "@/components/bolt/Collapsible/Area/AreaCollapsible";

import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { AreaItem } from "@/components/bolt/Collapsible/Area/AreaItem";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function CataloguesPage() {
    const areas = await getAllAreas();
    const divisions = await getAllDivisions();
    const businessUnits = await getAllBusinessUnits();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-end mb-[1rem]">
                <Button variant={"gemso_blue"} asChild>
                    <Link href={"/catalogos/crear"}>Agregar Catalogo</Link>
                </Button>
            </div>
            <DivisionsCollapsible title="Areas">
                {areas.map((area) => (
                    <AreaItem
                        key={area.id}
                        area={
                            {
                                key: area.id,
                                title: area.title,
                            }
                        }
                    />
                ))}
            </DivisionsCollapsible>
        </div>
    );
}