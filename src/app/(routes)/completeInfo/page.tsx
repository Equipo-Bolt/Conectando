"use server";

import { CompleteInfoForm } from "@/components/bolt/Inputs/CompleteInfoForm";

//!new 
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";

import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";
//! Changed page into async function page
async function Page() {
    //* load data from page, which is a server component
    const divisions : Division[] = await getAllDivisions(); 
    const areas : Area[] = await getAllAreas();
    const bus : BusinessUnit[] = await getAllBusinessUnits();
    const bosses : User[] = await getAllBosses();

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