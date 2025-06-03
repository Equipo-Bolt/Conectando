import { prisma } from "@/lib/prisma";

import { getAllClassifications } from "../classification/getAllClassifications";
import { getObjectiveClassificationById } from "../objective_classification/getObjectiveClassificationById";

import { FormObjectives } from "@/types/FormObjectives";

/**
 * * getObjectivesByFormId gets all objectives and objective classifications needed to construct a form
 * @param formId<number> id del formulario (propuesta de objetivos), se consigue con getCurrentFormIdOfUser
 * @returns arreglo de {@link FormObjectives}
 */
export async function getObjectivesByFormId( formId : number ) {
    try {
        const objectives = await prisma.objective.findMany({
            where: { deactivated : false, formID : formId },
            include: { objectiveClassification : true, comments : true }
        });

        const classificationsCatalogs = await getAllClassifications();

        if (objectives.length === 0) {  
            const emptyFormObjectives : FormObjectives[] = classificationsCatalogs.map(classification => ({
                classificationTitle: classification.title,
                weight: 0,
                objectiveClassificationID: null,
                objectives: []
            }));

            return emptyFormObjectives; //! Empty form with ordered classifications
        }
        
        const uniqueClassificationObjectivesIds = Array.from(new Set(objectives.map(objective => objective.objectiveClassification.id)));

        const classifications = await Promise.all(uniqueClassificationObjectivesIds.map(ct => getObjectiveClassificationById(ct)));

        const objectivesByClassifications : FormObjectives[] = classificationsCatalogs.map(classificationCatalog => {
            const matchingClassification = classifications.find(classification => classification.classificationTitle === classificationCatalog.title);
            if (matchingClassification) {
                return {
                    classificationTitle: matchingClassification.classificationTitle,
                    weight: matchingClassification.weight ?? 0,
                    objectiveClassificationID: matchingClassification.id || null,
                    objectives: objectives
                        .filter(objective => objective.objectiveClassification.id === matchingClassification.id)
                };
            } 
            
            return {
                classificationTitle: classificationCatalog.title,
                weight: 0,
                objectiveClassificationID: null,
                objectives: []
            };
        });

        const formObjectives : FormObjectives[] = [];
        for (let i = 0; i < classificationsCatalogs.length; i++) {
            const objClf = objectivesByClassifications[i];
            formObjectives.push({
                classificationTitle: objClf.classificationTitle,
                weight: objClf?.weight || 0,
                objectiveClassificationID: objClf.objectiveClassificationID,
                objectives: objClf.objectives.map(({
                    createdAt,
                    formID,
                    ...o 
                }) => o) 
            });
        }
        return formObjectives;
    } catch(error) {
        console.error(`Error fetching objectives: ${(error as Error).message}`);
        return ([] as FormObjectives[]);
    }
}