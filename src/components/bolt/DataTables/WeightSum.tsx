import { Objective } from "@/types/Objective";
import { useMemo } from "react";

interface WeightSumProps {
  objectives: Objective[];
}

/**
 * @description A React functional component that calculates and displays the total weight
 *              of objectives passed as a prop. The total weight is computed using the
 *              `useMemo` hook to optimize performance by memoizing the result.
 *
 * @param {WeightSumProps} props - The props for the component.
 * @param {Array<{ weight?: number }>} props.objectives - An array of objectives, each containing
 *                                                        an optional `weight` property.
 * @returns {JSX.Element} A styled `div` element displaying the total weight as a percentage.
 */
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
