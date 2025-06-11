import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface TextWithTooltipProps {
  title?: string;
  maxLength?: number;
}

export const TextWithTooltip: React.FC<TextWithTooltipProps> = ({
  title,
  maxLength = 40,
}) => {
  if (!title) {
    return <span className="text-gray-500">Sin título</span>;
  }

  const isTextTruncated = title.length > maxLength;
  const displayText = isTextTruncated
    ? `${title.slice(0, maxLength)}...`
    : title;

  if (!isTextTruncated) {
    return <span>{displayText}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{displayText}</span>
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white max-w-[400px] w-auto text-center"
          side="bottom"
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
