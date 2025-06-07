import { gradeMultipliers } from "@/types/GradeMultipliers";

export const calculateGrade = (
  grade: number | null,
  weight: number
): string => {
  if (grade == null || !(grade in gradeMultipliers)) {
    return "S/C";
  }

  const multiplier = gradeMultipliers[grade];
  const calculation = Math.round(weight * multiplier * 100) / 100;
  return `${parseFloat(calculation.toFixed(2))}%`;
};
