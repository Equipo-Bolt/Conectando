import { Objective } from "@/types/Objective";
import { useMemo } from "react";

interface WeightSumProps {
  objectives: Objective[];
}

export default function WeightSum({ objectives }: WeightSumProps) {
  const totalWeight = useMemo(
    () => objectives.reduce((sum, { weight = 0 }) => sum + weight, 0),
    [objectives]
  );

  return (
    <div className=" h-[1.5rem] font-medium text-sm border-b-2 border-gemso-blue">
      Peso total: {totalWeight} %
    </div>
  );
}
