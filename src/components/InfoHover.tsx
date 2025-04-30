import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InfoHoverProps {
  children: React.ReactNode;
}

const InfoHover: React.FC<InfoHoverProps> = ({ children }) => {
  return (
    <div className="flex items-center">
      <div className="italic text-sm mr-2">Mas información</div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative inline-block">
            <InformationCircleIcon className="w-4 h-4 text-black bg-white rounded-full" />
          </div>
        </TooltipTrigger>

        <TooltipContent
          className="bg-white text-black drop-shadow-md"
          side="bottom"
          align="start"
          sideOffset={2}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default InfoHover;
