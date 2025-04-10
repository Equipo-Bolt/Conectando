import { prisma } from "@/lib/prisma";

/*
    ! In this file, catalogs and preliminary records will be declared
    
    * First, we will be include the catalogs
    * Next, entities with relations:
    *   - Users with form in draft
    *   - Users with form with objectives
    *   - Users with Collaborators
*/
async function main() {

    //! Upsert udpates an entry or creates one if it doesnt find it
    
    //TODO Use files in secure folder to import catalogs

    //TODO Create an array form the files and use map function to upsert the data


    console.log("Catalogs and Prelminar data seeded")
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })