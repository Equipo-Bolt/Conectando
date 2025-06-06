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

        const targetForm = await prisma.form.findUnique({
            where: { id : formId },
            include: { 
                objectives : {
                    where: {
                        deactivated : false
                    },
                    include: {
                        comments : true
                    }
            }, }
        })
        const targetFormObjectives = targetForm?.objectives;

        const classificationsCatalogs = await getAllClassifications();

        if (!targetFormObjectives) {  
            const emptyFormObjectives : FormObjectives[] = classificationsCatalogs.map(classification => ({
                classificationTitle: classification.title,
                weight: 0,
                objectiveClassificationID: null,
                objectives: []
            }));

            return emptyFormObjectives; //! Empty form with ordered classifications
        }
        
        const uniqueClassificationObjectivesIds = Array.from(new Set(targetFormObjectives.map(objective => objective.objectiveClassificationID)));

        const classifications = await Promise.all(uniqueClassificationObjectivesIds.map(ct => getObjectiveClassificationById(ct)));

        const objectivesByClassifications : FormObjectives[] = classificationsCatalogs.map(classificationCatalog => {
            const matchingClassification = classifications.find(classification => classification.classificationTitle === classificationCatalog.title);
            if (matchingClassification) {
                return {
                    classificationTitle: matchingClassification.classificationTitle,
                    weight: matchingClassification.weight ?? 0,
                    objectiveClassificationID: matchingClassification.id || null,
                    objectives: 
                        targetFormObjectives
                        .filter(objective => objective.objectiveClassificationID === matchingClassification.id)
                        .map(objective => ({
                            ...objective,
                            comments: objective.comments ?? []
                        }))
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