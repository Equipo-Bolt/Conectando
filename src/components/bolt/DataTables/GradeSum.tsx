import { Objective } from "@/types/Objective";
import { useMemo } from "react";
import { gradeMultipliers } from "@/types/GradeMultipliers";

interface GradeSumProps {
  objectives: Objective[];
}

/**
 * @description A React functional component that calculates and displays the total weighted grade
 *              for a list of objectives. Each objective has an associated grade and weight, where
 *              the grade determines a multiplier that influences the final calculation.
 *
 * @param {WeightSumProps} props - The props for the component.
 * @param {Objective[]} props.objectives - An array of objectives, each containing a `grade` and an
 *                                         optional `weight` property.
 * @returns {JSX.Element} A styled `div` element displaying the calculated total weighted grade
 *                        as a percentage.
 */
export default function GradeSum({ objectives }: GradeSumProps) {
  const totalWeight = useMemo(
    () =>
      objectives.reduce((sum, { grade, weight }) => {
        const multiplier = grade != null ? gradeMultipliers[grade] || 0 : 0;
        return sum + (weight != null ? weight * multiplier : 0);
      }, 0),
    [objectives]
  );

  return (
    <div className=" h-[1.5rem] font-medium text-sm border-b-2 border-gemso-blue">
      Calificacion total: {totalWeight} %
    </div>
  );
}
