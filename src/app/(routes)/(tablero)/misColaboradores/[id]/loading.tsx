import React from 'react';

import { Loader } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader className="w-12 h-12 animate-spin text-gemso-blue" />
            <p className="loading text-gemso-blue">Cargando...</p>
        </div>
    );
}