import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { ChevronLeft, ChevronRight, } from "lucide-react"

export default function DivisionBusinessUnitCollapsible({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
    return (
    <Collapsible className="w-full">
        <CollapsibleTrigger className=" flex justify-between w-full p-[1rem] text-left bg-gray-200 border border-gray-300 rounded-lg focus:outline-none cursor-pointer">
            <span className="text-lg font-semibold">{title}</span>
            <div className="flex items-center">
                <ChevronLeft className="size-xl transition-transform duration-200 transform hover:opacity-80" />
                <ChevronRight className="size-xl transition-transform duration-200 transform hover:opacity-80" />
            </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-lg h-auto ml-[1rem] flex flex-col">
            {children}
        </CollapsibleContent>
    </Collapsible>
    )
}