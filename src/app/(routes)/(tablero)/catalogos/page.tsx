import DivisionsCollapsible from "@/components/bolt/Collapsible/Area/AreaCollapsible";

import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { AreaItem } from "@/components/bolt/Collapsible/Area/AreaItem";

export default async function CataloguesPage() {
    const areas = await getAllAreas();
    const divisions = await getAllDivisions();
    const businessUnits = await getAllBusinessUnits();

    return (
        <div className="flex flex-col items-center justify-center h-full">
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