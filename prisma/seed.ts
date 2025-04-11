import { connect } from "http2";
import { prisma } from "../src/lib/prisma";
import * as fs from "fs";

/*
    ! In this file, catalogs and preliminary records will be declared to populate the db
    
    * First, we will be include the catalogs
    * Next, entities using upsert function.
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

  for (const title of catalogAreas) { //! using for to insert in order
    await prisma.area.upsert({
      where: { title },
      create: { title },
      update: { title },
    });
  }

  for (const title of catalogDivisions) {
    await prisma.division.upsert({
      where: { title },
      create: { title },
      update: { title },
    });
  }

  for (const bu of catalogBusinessUnits) {
    await prisma.businessUnit.upsert({
      where: { title: bu.title },
      create: { title: bu.title, divisionID: bu.divisionID },
      update: { title: bu.title },
      });
  }

  for (const title of catalogClasifications) {
      await prisma.classification.upsert({
        where: { title },
        create: { title },
        update: { title },
      });
  }

  for (const title of catalogProgresses) {
      await prisma.progress.upsert({
        where: { title },
        create: { title },
        update: { title },
      });
  }

  for (const title of catalogRoles) {
      await prisma.role.upsert({
        where: { title },
        create: { title },
        update: { title },
      });
  }

  //! ------------------------- Catalogs --------------------------------------

  //! ------------------------- Dummy Data -------------------------------}
  
  //* Users
  const userBoss = await prisma.user.upsert({
    where: { employeeNumber: 22222 }, //* We can use the employee number field to search the user
    update: {
      fullName: "Daniel Fernández",
      email: "daniel@gmail.com",
      jobPosition: "Manager de Software",
      positionSeniority: 12,
      companySeniority: 36,
      companyContribution: "Mi puesto como manager de software " +
        "contribuye a la empresa en lograr estar siempre " +
        "actualizados en ámbitos tecnológicos.",
      role: {
        connect: { //* connect allows to relate to an entry with unique field
          id: 4 //* connect Daniel to the role with id 4
        }
      },
      businessUnit: {
        connect: {
          id: 6
        }
      },
      area: {
        connect: {
          id: 10
        }
      },
    },
    create: {
      employeeNumber: 22222,
      fullName: "Daniel Fernández",
      email: "daniel@gmail.com",
      jobPosition: "Manager de Software",
      positionSeniority: 12,
      companySeniority: 36,
      companyContribution: "Mi puesto como manager de software " +
        "contribuye a la empresa en lograr estar siempre " +
        "actualizados en ámbitos tecnológicos.",
      boss: {
        create: { //* Boss of Daniel
          employeeNumber: 11111, //! this shouldn't be done in actual logic
          fullName: "Juan Gutierrez",
          jobPosition: "Jefe del sector agrícola",
          roleID: 4
        }
      },
      role: {
        connect: {
          id: 4
        }
      },
      businessUnit: {
        connect: {
          id: 6
        }
      },
      area: {
        connect: {
          id: 10
        }
      },
    },
  });
  
  const userCollaborator = await prisma.user.upsert({
    where: { employeeNumber: 33333 },
    update: {
      fullName: "Andrés Sandoval Ibarra",
      email: "andres@gmail.com",
      jobPosition: "Coordinado de Puesto TI",
      positionSeniority: 1,
      companySeniority: 1,
      companyContribution: "",
      boss: { //* Boss of Andres (daniel)
        connect: {
          id: (await userBoss).id //* since boss was created above we can access its id
        }
      },
      role: {
        connect: {
          id: 1
        }
      },
      businessUnit: {
        connect: {
          id: 1
        }
      },
      area: {
        connect: {
          id: 3
        }
      },
    },
    create: {
      employeeNumber: 33333,
      fullName: "Andrés Sandoval Ibarra",
      email: "andres@gmail.com",
      jobPosition: "Coordinador de Puesto TI",
      positionSeniority: 1,
      companySeniority: 1,
      companyContribution: "",
      boss: {
        connect: {
          id: (await userBoss).id
        }
      },
      role: {
        connect: {
          id: 1
        }
      },
      businessUnit: {
        connect: {
          id: 1
        }
      },
      area: {
        connect: {
          id: 3
        }
      },
    },
  });
  
  //*Forms
  const formCollaborator = await prisma.form.upsert({
    where: { id : 1 },
    update: {
      collaborator: {
        connect: {
          id: (await userCollaborator).id
        }
      },
      evaluator: {
        connect: {
          id: (await userBoss).id
        }
      },
      progress: {
        connect: {
          id: 1
        }
      }
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator).id
        }
      },
      evaluator: {
        connect: {
          id: (await userBoss).id
        }
      },
      progress: {
        connect: {
          id: 1
        }
      }
    }
  })

  const formBoss = await prisma.form.upsert({
    where: { id : 2 },
    update: {
      collaborator: {
        connect: {
          id: (await userBoss).id
        }
      },
      evaluator: {
        connect: {
          employeeNumber: 11111
        }
      },
      progress: {
        connect: {
          id: 1
        }
      }
    },
    create: {
      collaborator: {
        connect: {
          id: (await userBoss).id
        }
      },
      evaluator: {
        connect: {
          employeeNumber: 11111
        }
      },
      progress: {
        connect: {
          id: 1
        }
      }
    }
  })
  
  //! ------------------------- Dummy Data -------------------------------
  console.log("Catalogs and Dummy data seeded.");
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
