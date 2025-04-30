import { prisma } from "@/lib/prisma";

import { getObjectiveClassificationById } from "../objective_classification/getObjectiveClassificationById";

import { TypeFormObjectives } from "@/types/TypeFormObjectives";

/**
 * * getObjectivesByFormId
 * @param formId = id del formulario (propuesta de objetivos), se consigue con getCurrentFormIdOfUser
 * @returns arreglo de TypeFormObjectives
 */
export async function getObjectivesByFormId( formId : number ) {
    try {
        const objectives = await prisma.objective.findMany({
            where: { deactived : false, formID : formId },
            include: { classification : true }
        });

        if (objectives.length === 0) {
            return [] as TypeFormObjectives[]; //! Cambiado para que ya no mande error innecesario
        }

        const uniqueClassificationObjectivesIds = Array.from(new Set(objectives.map(objective => objective.classification.id)));

        const classifications = await Promise.all(uniqueClassificationObjectivesIds.map(ct => getObjectiveClassificationById(ct)));

        const objectivesByClassifications = classifications.map(classification => {
            return {
                classificationTitle: classification.classificationTitle,
                classificationObjectiveID: classification.id,
                weight: classification.weight,
                objectives: objectives.filter(objective => objective.classification.id === classification.id)
            };
        });
        
        const formObjectives : TypeFormObjectives[] = [];
        for (let i = 0; i < objectivesByClassifications.length; i++) {
            const objClf = objectivesByClassifications[i];
            formObjectives.push({
                classificationTitle: objClf.classificationTitle,
                weight: objClf?.weight || 0,
                objectiveClassificationID: objClf.classificationObjectiveID,
                objectives: objClf.objectives
                    .map(({
                        deactived,
                        updatedAt,
                        createdAt,
                        formID,
                        objectiveClassificationID,
                        classification, 
                        ...o }) => o) //! Excluir datos que no se usan
            });
        }

        return formObjectives;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}