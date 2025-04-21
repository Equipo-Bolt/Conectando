"use server";

import { CompleteInfoForm } from "@/components/CompleteInfoForm";

const Page = () => {
    return (
        <div className="p-16 h-screen">
            <h1 className="text-4xl font-bold mb-8">Completa tu información</h1>
            <div className="w-7/8">
                <CompleteInfoForm />
            </div>
            <p>Esta es la página de información completa.</p>
        </div>
    );
}

export default Page;