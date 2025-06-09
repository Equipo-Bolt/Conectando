import AreaCollapsible from "@/components/bolt/Collapsible/Area/AreaCollapsible";

import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { AreaItem } from "@/components/bolt/Collapsible/Area/AreaItem";
import {Button} from "@/components/ui/button";
import Link from "next/link";

import DivisionBusinessUnitCollapsible from "@/components/bolt/Collapsible/DivisionBusinessUnit/DivsionBusinessUnitCollapsible";
import DivisionCollapsible from "@/components/bolt/Collapsible/DivisionBusinessUnit/DivisionCollapsible";
import { BusinessUnitItem } from "@/components/bolt/Collapsible/DivisionBusinessUnit/BusinessUnitItem";

export default async function CataloguesPage() {
    const areas = await getAllAreas();
    const divisions = await getAllDivisions();
    const businessUnits = await getAllBusinessUnits();

    return (
        <div className="flex flex-col h-auto gap-[1rem]">
            <h1 className="text-3xl  font-bold">Administración de Catálogos</h1>
            <div className="flex justify-end">
                <Button variant={"gemso_blue"} asChild>
                    <Link href={"/catalogos/crear"}>Agregar Catálogo</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] w-full">
                <AreaCollapsible title="Áreas">
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
                </AreaCollapsible>
                <DivisionBusinessUnitCollapsible
                    title="Divisiones y Unidades de Negocio"
                >
                    {divisions.map((division) => (
                        <DivisionCollapsible
                            key={division.id}
                            title={division.title}
                            division={{
                                key: division.id,
                                title: division.title,
                            }}
                        >
                            {businessUnits
                                .filter((bu) => bu.divisionID === division.id)
                                .map((bu) => (
                                    <BusinessUnitItem
                                        key={bu.id}
                                        businessUnit={{
                                            key: bu.id,
                                            title: bu.title,
                                        }}
                                    />
                                ))}
                        </DivisionCollapsible>
                    ))}
                </DivisionBusinessUnitCollapsible>
            </div>
        </div>
    );
}