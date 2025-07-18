// components/bolt/AreaItem.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableAreaAction } from "@/app/actions/area/disableArea";
import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import { PencilIcon } from "@heroicons/react/24/solid";

export function AreaItem({ area }: { area: { key: number; title: string } }) {
    const router = useRouter();

    return (
        <div key={area.key} className="flex items-center justify-between p-[1rem] border-b border-gray-200">
            <h3 className="text-md font-medium">{area.title}</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        router.push(`/catalogos/area/${area.key}`);
                    }}
                >
                    <PencilIcon className="w-5 h-5 cursor-pointer" color="#023b72" />
                </button>
                <DeleteButton
                    id={area.key}
                    title="Eliminar Área"
                    description="¿Desea eliminar esta área? Esta acción no se puede deshacer."
                    handleConfirm={async (key) => {
                        await disableAreaAction(null, key);
                        window.location.reload();
                    }}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            </div>
        </div>
    );
}
