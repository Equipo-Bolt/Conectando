// components/bolt/businessUnitItem.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableBusinessUnitAction } from "@/app/actions/business_unit/disableBusinessUnit";
import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import { PencilIcon } from "@heroicons/react/24/solid";

export function BusinessUnitItem({ businessUnit }: { businessUnit: { key: number; title: string } }) {
    const router = useRouter();

    return (
        <div key={businessUnit.key} className="flex items-center justify-between p-[1rem] border-b border-gray-200">
            <h3 className="text-md font-medium">{businessUnit.title}</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        router.push(`/catalogos/unidadDeNegocio/${businessUnit.key}`);
                    }}
                >
                    <PencilIcon className="w-5 h-5 cursor-pointer" color="#023b72" />
                </button>
                <DeleteButton
                    id={businessUnit.key}
                    title="Eliminar businessUnit"
                    description="¿Estás seguro de que deseas eliminar esta Unidad de Negocio? Esta acción no se puede deshacer."
                    handleConfirm={async (key) => {
                        await disableBusinessUnitAction(null, key);
                        window.location.reload();
                    }}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            </div>
        </div>
    );
}
