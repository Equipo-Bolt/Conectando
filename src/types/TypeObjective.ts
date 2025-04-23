//! Frontend mandate this
export interface TypeObjective {
    id: number
    result: string | null
    grade: number | null
    weight: number
    title: string
    goal: string | null
    formID: number
    createdAt: Date
    objectiveClassificationID: number
    /* 
     ? Francisco: Here Backend could give a lot of things.

     ? Lets say you want to know the title and weight of the clasification an objective is linked to
     ? It could be done here like:
    objectiveClassificationWeight: number,
    objectiveClassificationTitle: string

     ? And then frontend just maps the array and has both 4 Classifications with their weights
     ! HOWEVER this could be too much or too confusing

     ? My other recommendation is to get the objectives as they are now, map then and the--
     ? -- 4 unique objectiveClassificationIDs and then use getObjectiveClassificationById to get:
     WEIGHT & TITLE
     ! HOWEVER (again) this way you use at least 4 fetches but its cleaner :/

     ? I await your response

     * NOTE: maybe for the tables you wouldnt like to receive ALL the data of the objective--
     * --so tell me when you update the interface
    **/
}