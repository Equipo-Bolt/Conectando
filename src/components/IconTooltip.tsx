import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface IconTooltipProps {
  children?: React.ReactNode;
}

const IconTooltip: React.FC<IconTooltipProps> = ({ children }) => {
  const iconColor = children ? "text-green-800" : "text-red-800";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DocumentTextIcon className={`w-5 h-5 ${iconColor}`} />
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white max-w-[400px] w-auto text-center"
          side="bottom"
        >
          {children || "Campo no llenado"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconTooltip;
