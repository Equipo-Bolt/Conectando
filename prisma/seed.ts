import { prisma } from "../src/lib/prisma";
import * as fs from "fs";

/*
    ! In this file, catalogs and preliminary records will be declared to populate the db
    
    * First, we will be include the catalogs
    * Next, entities with relations:
    *   - Users with form in draft
    *   - Users with form with objectives
    *   - Users with Collaborators
*/
async function main() {
  //! ------------------------- Catalogs --------------------------------------
  const rawAreas = fs.readFileSync("./secure/areas.json", "utf-8");
  const rawBusinessUnits = fs.readFileSync("./secure/businessUnits.json","utf-8");
  const rawClasifications = fs.readFileSync("./secure/clasifications.json","utf-8");
  const rawDivisions = fs.readFileSync("./secure/divisions.json", "utf-8");
  const rawProgresses = fs.readFileSync("./secure/progresses.json", "utf-8");
  const rawRoles = fs.readFileSync("./secure/roles.json", "utf-8");

  const catalogAreas: string[] = JSON.parse(rawAreas);
  const catalogBusinessUnits: { title: string; divisionID: number }[] = JSON.parse(rawBusinessUnits);
  const catalogClasifications: string[] = JSON.parse(rawClasifications);
  const catalogDivisions: string[] = JSON.parse(rawDivisions);
  const catalogProgresses: string[] = JSON.parse(rawProgresses);
  const catalogRoles: string[] = JSON.parse(rawRoles);

  await Promise.all(
    catalogAreas.map((title) =>
      prisma.area.upsert({
        where: { title },
        create: { title },
        update: { title },
      })
    )
  );

  await Promise.all(
    catalogDivisions.map((title) =>
      prisma.division.upsert({
        where: { title },
        create: { title },
        update: { title },
      })
    )
  );

  await Promise.all(
    catalogBusinessUnits.map((bu) =>
      prisma.businessUnit.upsert({
        where: { title: bu.title },
        create: { title: bu.title, divisionID: bu.divisionID },
        update: { title: bu.title },
      })
    )
  );

  await Promise.all(
    catalogClasifications.map((title) =>
      prisma.classification.upsert({
        where: { title },
        create: { title },
        update: { title },
      })
    )
  );

  await Promise.all(
    catalogProgresses.map((title) =>
      prisma.progress.upsert({
        where: { title },
        create: { title },
        update: { title },
      })
    )
  );

  await Promise.all(
    catalogRoles.map((title) =>
      prisma.role.upsert({
        where: { title },
        create: { title },
        update: { title },
      })
    )
  );

  //! ------------------------- Catalogs --------------------------------------

  console.log("Catalogs and Preliminar data seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
