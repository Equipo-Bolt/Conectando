"use server";

import { CompleteInfoForm } from "@/components/CompleteInfoForm";

//!new 
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";

import { TypeDivision } from "@/types/TypeDivision";
import { TypeArea } from "@/types/TypeArea";
import { TypeBusinessUnit } from "@/types/TypeBusinessUnit";
//! Changed page into async function page
async function Page() {
    //* load data from page, which is a server component
    const divisions : TypeDivision[] = await getAllDivisions(); 
    const areas : TypeArea[] = await getAllAreas();
    const bus : TypeBusinessUnit[] = await getAllBusinessUnits();

    return (
        <div className="p-16 h-screen">
            <h1 className="text-4xl font-bold mb-8">Completa tu información</h1>
            <div className="w-7/8">
                <CompleteInfoForm 
                    divisions = { divisions }
                    areas = { areas }
                    businessUnits = { bus }
                />
            </div>
            <p>Esta es la página de información completa.</p>
        </div>
    );
}

export default Page;