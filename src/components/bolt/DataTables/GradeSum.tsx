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
 * @param {GradeSumProps} props - The props for the component.
 * @param {Objective[]} props.objectives - An array of objectives, each containing a `grade` and an
 *                                         optional `weight` property.
 * @returns {JSX.Element} A styled `div` element displaying the calculated total weighted grade
 *                        as a percentage.
 */
export default function GradeSum({ objectives }: GradeSumProps) {
  const totalWeight = useMemo(() => {
    //We verify if there is any valid grade in the received objectives
    const hasValidGrades = objectives.some(({ grade }) => grade != null);
    //Return "S/C if not"
    if (!hasValidGrades) {
      return "S/C";
    }

    const sum = objectives.reduce((accumulator, { grade, weight }) => {
      const multiplier =
        grade != null && grade in gradeMultipliers
          ? gradeMultipliers[grade]
          : 0;

      const calculatedValue = weight != null ? weight * multiplier : 0;
      return accumulator + calculatedValue;
    }, 0);

    const rounded = Math.round(sum * 100) / 100;
    return parseFloat(rounded.toFixed(2)).toString() + "%";
  }, [objectives]);

  return (
    <div className="h-[1.5rem] font-medium text-sm border-b-2 border-gemso-blue">
      Calificación total: {totalWeight}
    </div>
  );
}
