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
            where: { deactived : false, formID : formId },
            include: { classification : true }
        });

        const classificationsCatalogs = await getAllClassifications();

        if (objectives.length === 0) {  
            const emptyFormObjectives : FormObjectives[] = classificationsCatalogs.map(classification => ({
                classificationTitle: classification.title,
                weight: 0,
                objectiveClassificationID: null,
                objectives: []
            }));

            return emptyFormObjectives; //! Formulario sin objs pero con clasificaciones en orden
        }
        
        const uniqueClassificationObjectivesIds = Array.from(new Set(objectives.map(objective => objective.classification.id)));

        const classifications = await Promise.all(uniqueClassificationObjectivesIds.map(ct => getObjectiveClassificationById(ct)));

        const objectivesByClassifications : FormObjectives[] = classificationsCatalogs.map(classificationCatalog => {
            //! Hacemos que respete el orden de las clasificaciones, si no encuentra de una crea el objeto vacio pero usable
            const matchingClassification = classifications.find(classification => classification.classificationTitle === classificationCatalog.title);
            if (matchingClassification) {
                return {
                    classificationTitle: matchingClassification.classificationTitle,
                    weight: matchingClassification.weight ?? 0,
                    objectiveClassificationID: matchingClassification.id || null,
                    objectives: objectives.filter(objective => objective.classification.id === matchingClassification.id)
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
                    objectiveClassificationID,
                    ...o 
                }) => o) //! Excluir datos que no se usan    
            });
        }
        return formObjectives;
    } catch(error) {
        console.error(`Error fetching objectives: ${(error as Error).message}`);
        return ([] as FormObjectives[]);
    }
}