"use server";

import { CompleteInfoForm } from "@/components/CompleteInfoForm";

//!new 
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";

import { TypeDivision } from "@/types/TypeDivision";
import { TypeArea } from "@/types/TypeArea";
import { TypeBusinessUnit } from "@/types/TypeBusinessUnit";
import { TypeUser } from "@/types/TypeUser";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";
//! Changed page into async function page
async function Page() {
    //* load data from page, which is a server component
    const divisions : TypeDivision[] = await getAllDivisions(); 
    const areas : TypeArea[] = await getAllAreas();
    const bus : TypeBusinessUnit[] = await getAllBusinessUnits();
    const bosses : TypeUser[] = await getAllBosses();

    return (
        <div className="p-[3rem]">
            <h1 className="text-4xl font-bold mb-[1rem]">Completa tu información</h1>
            <CompleteInfoForm 
                divisions = { divisions }
                areas = { areas }
                businessUnits = { bus }
                bosses = { bosses }
            />
        </div>
    );
}

export default Page;