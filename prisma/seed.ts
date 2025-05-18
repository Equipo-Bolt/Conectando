import { prisma } from "@/lib/prisma";
import * as fs from "fs";

/*
    ! In this file, catalogs and preliminary records will be declared to populate the db
    
    * First, we will be include the catalogs
    * Next, entities using upsert function.
*/

async function main() {
  //! ------------------------- Catalogs --------------------------------------

  const rawAreas = fs.readFileSync("./secure/areas.json", "utf-8");
  const rawBusinessUnits = fs.readFileSync(
    "./secure/businessUnits.json",
    "utf-8"
  );
  const rawClasifications = fs.readFileSync(
    "./secure/classifications.json",
    "utf-8"
  );
  const rawDivisions = fs.readFileSync("./secure/divisions.json", "utf-8");
  const rawProgresses = fs.readFileSync("./secure/progresses.json", "utf-8");
  const rawRoles = fs.readFileSync("./secure/roles.json", "utf-8");
  const rawPeriods = fs.readFileSync("./secure/periods.json", "utf-8");

  const catalogAreas: string[] = JSON.parse(rawAreas);
  const catalogBusinessUnits: { title: string; divisionID: number }[] =
    JSON.parse(rawBusinessUnits);
  const catalogClasifications: string[] = JSON.parse(rawClasifications);
  const catalogDivisions: string[] = JSON.parse(rawDivisions);
  const catalogProgresses: string[] = JSON.parse(rawProgresses);
  const catalogRoles: string[] = JSON.parse(rawRoles);
  const catalogsPeriods: {
    id: number;
    startsAt: string;
    endsAt: string;
    isCurrent: boolean;
  }[] = JSON.parse(rawPeriods);

  for (const title of catalogAreas) {
    //! using for to insert in order
    await prisma.area.upsert({
      where: { title },
      create: { title },
      update: { title, deactived: false },
    });
  }

  for (const title of catalogDivisions) {
    await prisma.division.upsert({
      where: { title },
      create: { title },
      update: { title, deactived: false },
    });
  }

  for (const bu of catalogBusinessUnits) {
    await prisma.businessUnit.upsert({
      where: { title: bu.title },
      create: { title: bu.title, divisionID: bu.divisionID },
      update: { title: bu.title, divisionID: bu.divisionID, deactived: false },
    });
  }

  for (const title of catalogClasifications) {
    await prisma.classification.upsert({
      where: { title },
      create: { title },
      update: { title, deactived: false },
    });
  }

  for (const title of catalogProgresses) {
    await prisma.progress.upsert({
      where: { title },
      create: { title },
      update: { title, deactived: false },
    });
  }

  for (const title of catalogRoles) {
    await prisma.role.upsert({
      where: { title },
      create: { title },
      update: { title, deactived: false },
    });
  }

  for (const period of catalogsPeriods) {
    await prisma.period.upsert({
      where: { id: period.id },
      create: {
        startsAt: new Date(period.startsAt),
        endsAt: new Date(period.endsAt),
        isCurrent: period.isCurrent,
      },
      update: {
        startsAt: new Date(period.startsAt),
        endsAt: new Date(period.endsAt),
        isCurrent: period.isCurrent,
        deactived: false,
      },
    });
  }
  //! ------------------------- Catalogs --------------------------------------

  //! ------------------------- Dummy Data -------------------------------}

  //* Users
  const userBoss = await prisma.user.upsert({
    where: { employeeNumber: 22222 }, //* We can use the employee number field to search the user
    update: {
      fullName: "Daniel Fernández",
      email: "daniel@gemso.com",
      jobPosition: "Manager de Software",
      positionSeniority: new Date("2025-04-20"),
      companySeniority: new Date("2025-02-01"),
      companyContribution:
        "Mi puesto como manager de software " +
        "contribuye a la empresa en lograr estar siempre " +
        "actualizados en ámbitos tecnológicos.",
      deactived: false,
      role: {
        connect: {
          //* connect allows to relate to an entry with unique field
          id: 4, //* connect Daniel to the role with id 4
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 10,
        },
      },
    },
    create: {
      employeeNumber: 22222,
      fullName: "Daniel Fernández",
      email: "daniel@gemso.com",
      jobPosition: "Manager de Software",
      positionSeniority: new Date("2025-04-20"),
      companySeniority: new Date("2025-02-01"),
      companyContribution:
        "Mi puesto como manager de software " +
        "contribuye a la empresa en lograr estar siempre " +
        "actualizados en ámbitos tecnológicos.",
      boss: {
        create: {
          //* Boss of Daniel
          employeeNumber: 11111,
          fullName: "Juan Gutierrez",
          jobPosition: "Jefe del sector agrícola",
          roleID: 2,
        },
      },
      role: {
        connect: {
          id: 4,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 10,
        },
      },
    },
  });

  const userCollaborator = await prisma.user.upsert({
    where: { employeeNumber: 33333 },
    update: {
      fullName: "Andrés Sandoval Ibarra",
      email: "andres@gemso.com",
      jobPosition: "Coordinado de Puesto TI",
      positionSeniority: new Date("2025-04-20"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Soy muy chilo",
      deactived: false,
      boss: {
        //* Boss of Andres (daniel)
        connect: {
          id: (await userBoss).id, //* since boss was created above we can access its id
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 1,
        },
      },
      area: {
        connect: {
          id: 3,
        },
      },
    },
    create: {
      employeeNumber: 33333,
      fullName: "Andrés Sandoval Ibarra",
      email: "andres@gemso.com",
      jobPosition: "Coordinador de Puesto TI",
      positionSeniority: new Date("2025-04-20"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Soy muy chilo",
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 1,
        },
      },
      area: {
        connect: {
          id: 3,
        },
      },
    },
  });

  const userCollaborator2 = await prisma.user.upsert({
    where: { employeeNumber: 44444 },
    update: {
      fullName: "Colaborador Dos",
      email: "colab2@gemso.com",
      jobPosition: "Lider de Redes Sociales",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2023-01-26"),
      companyContribution: "Chambeo muy padre",
      deactived: false,
      boss: {
        //* Boss of Colaborador 2 (daniel)
        connect: {
          id: (await userBoss).id, //* since boss was created above we can access its id
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 12,
        },
      },
      area: {
        connect: {
          id: 8,
        },
      },
    },
    create: {
      employeeNumber: 44444,
      fullName: "Colaborador Dos",
      email: "colab2@gemso.com",
      jobPosition: "Lider de Redes Sociales",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2023-01-26"),
      companyContribution: "Chambeo muy padre",
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 12,
        },
      },
      area: {
        connect: {
          id: 8,
        },
      },
    },
  });

  const userCollaborator3 = await prisma.user.upsert({
    where: { employeeNumber: 55555 },
    update: {
      fullName: "Colaborador Tres",
      email: "colab3@gemso.com",
      jobPosition: "Intern",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Aprendo y aprendo",
      deactived: false,
      boss: {
        //* Boss of Colaborador 3 (daniel)
        connect: {
          id: (await userBoss).id, //* since boss was created above we can access its id
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
    create: {
      employeeNumber: 55555,
      fullName: "Colaborador Tres",
      email: "colab3@gemso.com",
      jobPosition: "Intern",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Aprendo y aprendo",
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
  });

  const userCollaborator4 = await prisma.user.upsert({
    where: { employeeNumber: 66666 },
    update: {
      fullName: "Colaborador Cuatro",
      email: "colab4@gemso.com",
      jobPosition: "Tester de Producto",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2024-08-11"),
      companyContribution: "Aseguro la calidad",
      deactived: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 12,
        },
      },
    },
    create: {
      employeeNumber: 66666,
      fullName: "Colaborador Cuatro",
      email: "colab4@gemso.com",
      jobPosition: "Tester de Producto",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2024-08-11"),
      companyContribution: "Aseguro la calidad",
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 12,
        },
      },
    },
  });

  const userCollaborator5 = await prisma.user.upsert({
    where: { employeeNumber: 77777 },
    update: {
      fullName: "Colaborador Sin Formulario",
      email: "colab5@gemso.com",
      jobPosition: "Ayudante de intern",
      positionSeniority: new Date("2025-04-01"),
      companySeniority: new Date("2024-04-01"),
      companyContribution: "Soy nuevo nuevo nuevo",
      deactived: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
    create: {
      employeeNumber: 77777,
      fullName: "Colaborador Sin Formulario",
      email: "colab5@gemso.com",
      jobPosition: "Ayudante de intern",
      positionSeniority: new Date("2025-04-01"),
      companySeniority: new Date("2024-04-01"),
      companyContribution: "Soy nuevo nuevo nuevo",
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
  });

  const userCollaborator6 = await prisma.user.upsert({
    where: { employeeNumber: 88888 },
    update: {
      fullName: "Colaborador Con Formulario Sin Objetivos",
      email: "colab6@gemso.com",
      jobPosition: "Compras",
      positionSeniority: new Date("2025-04-02"),
      companySeniority: new Date("2024-04-02"),
      companyContribution: "No hice mis objetivos",
      deactived: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
    create: {
      employeeNumber: 88888,
      fullName: "Colaborador Con Formulario Sin Objetivos",
      email: "colab6@gemso.com",
      jobPosition: "Compras",
      positionSeniority: new Date("2025-04-02"),
      companySeniority: new Date("2024-04-02"),
      companyContribution: "No hice mis objetivos",
      deactived: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 1,
        },
      },
      businessUnit: {
        connect: {
          id: 6,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
  });

  //*Forms
  const formCollaborator = await prisma.form.upsert({
    where: { id: 1 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userCollaborator).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 2,
        },
      },
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 2,
        },
      },
    },
  });

  const formBoss = await prisma.form.upsert({
    where: { id: 2 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      evaluator: {
        connect: {
          employeeNumber: 11111,
        },
      },
      progress: {
        connect: {
          id: 1,
        },
      },
    },
    create: {
      collaborator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      evaluator: {
        connect: {
          employeeNumber: 11111,
        },
      },
      progress: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const formCollaborator2 = await prisma.form.upsert({
    where: { id: 3 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userCollaborator2).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 3,
        },
      },
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator2).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 3,
        },
      },
    },
  });

  const formCollaborator3 = await prisma.form.upsert({
    where: { id: 4 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userCollaborator3).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 4,
        },
      },
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator3).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 4,
        },
      },
    },
  });

  /** 
   * ! Cambiado porque solo hay 4 progresos
  const formCollaborator4 = await prisma.form.upsert({
    where: { id : 5 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userCollaborator4).id
        }
      },
      evaluator: {
        connect: {
          id: (await userBoss).id
        }
      },
      progress: {
        connect: {
          id: 5
        }
      }
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator4).id
        }
      },
      evaluator: {
        connect: {
          id: (await userBoss).id
        }
      },
      progress: {
        connect: {
          id: 5
        }
      }
    }
  })
    */

  const formCollaborator5 = await prisma.form.upsert({
    where: { id: 5 },
    update: {
      deactived: false,
      collaborator: {
        connect: {
          id: (await userCollaborator6).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 1,
        },
      },
    },
    create: {
      collaborator: {
        connect: {
          id: (await userCollaborator6).id,
        },
      },
      evaluator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      progress: {
        connect: {
          id: 1,
        },
      },
    },
  });

  //* ObjectiveClassification
  const objectiveClassificationDivision =
    await prisma.objectiveClassification.upsert({
      where: { id: 1 },
      update: {
        weight: 70,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 1,
          },
        },
      },
      create: {
        weight: 70,
        classificationTitle: {
          connect: {
            id: 1,
          },
        },
      },
    });

  const objectiveClassificationPerBusiness =
    await prisma.objectiveClassification.upsert({
      where: { id: 2 },
      update: {
        weight: 10,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 2,
          },
        },
      },
      create: {
        weight: 10,
        classificationTitle: {
          connect: {
            id: 2,
          },
        },
      },
    });

  const objectiveClassificationPeople =
    await prisma.objectiveClassification.upsert({
      where: { id: 3 },
      update: {
        weight: 10,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 3,
          },
        },
      },
      create: {
        weight: 10,
        classificationTitle: {
          connect: {
            id: 3,
          },
        },
      },
    });

  const objectiveClassificationDevelopment =
    await prisma.objectiveClassification.upsert({
      where: { id: 4 },
      update: {
        weight: 10,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 4,
          },
        },
      },
      create: {
        weight: 10,
        classificationTitle: {
          connect: {
            id: 4,
          },
        },
      },
    });

  //* PARA FORMULARIO DE COLABORADOR CON ID 3: ANDRES

  const objectiveClassificationDivisionA =
    await prisma.objectiveClassification.upsert({
      where: { id: 5 },
      update: {
        weight: 25,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 1,
          },
        },
      },
      create: {
        weight: 25,
        classificationTitle: {
          connect: {
            id: 1,
          },
        },
      },
    });

  const objectiveClassificationPerBusinessA =
    await prisma.objectiveClassification.upsert({
      where: { id: 6 },
      update: {
        weight: 50,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 2,
          },
        },
      },
      create: {
        weight: 50,
        classificationTitle: {
          connect: {
            id: 2,
          },
        },
      },
    });

  const objectiveClassificationPeopleA =
    await prisma.objectiveClassification.upsert({
      where: { id: 7 },
      update: {
        weight: 10,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 3,
          },
        },
      },
      create: {
        weight: 10,
        classificationTitle: {
          connect: {
            id: 3,
          },
        },
      },
    });

  const objectiveClassificationDevelopmentA =
    await prisma.objectiveClassification.upsert({
      where: { id: 8 },
      update: {
        weight: 15,
        deactived: false,
        classificationTitle: {
          connect: {
            id: 4,
          },
        },
      },
      create: {
        weight: 15,
        classificationTitle: {
          connect: {
            id: 4,
          },
        },
      },
    });

  //* Objectives
  const objective1_1 = await prisma.objective.upsert({
    where: { id: 1 },
    update: {
      weight: 20,
      title: "Conseguir mejorar mi nivel de negocio",
      goal: "Al realizar este objetivo tengo como meta llegar a las 100 ventas en 50 dias en los dos departamentos relacionados con mi área.",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 20,
      title: "Conseguir mejorar mi nivel de negocio",
      goal: "Al realizar este objetivo tengo como meta llegar a las 100 ventas en 50 dias en los dos departamentos relacionados con mi área.",
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective1_2 = await prisma.objective.upsert({
    where: { id: 2 },
    update: {
      weight: 20,
      title: "Crear aportes clavo en el éxito del proyecto",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 20,
      title: "Crear aportes clave en el éxito del proyecto",
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective1_3 = await prisma.objective.upsert({
    where: { id: 3 },
    update: {
      weight: 30,
      title: "Conocer diferentes colaboradores",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 30,
      title: "Conocer diferentes colaboradores",
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective1_4 = await prisma.objective.upsert({
    where: { id: 4 },
    update: {
      weight: 30,
      title: "Diseñar un buen UI/UX",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 30,
      title: "Diseñar un buen UI/UX",
      classification: {
        connect: {
          id: (await objectiveClassificationDivision).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective2_1 = await prisma.objective.upsert({
    where: { id: 5 },
    update: {
      weight: 50,
      title: "Optimización de Algoritmo",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusiness).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 50,
      title: "Optimización de Algoritmo",
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusiness).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective2_2 = await prisma.objective.upsert({
    where: { id: 6 },
    update: {
      weight: 50,
      title: "Mejora en el Programa Conectado",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusiness).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 50,
      title: "Mejora en el Programa Conectado",
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusiness).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective3_1 = await prisma.objective.upsert({
    where: { id: 7 },
    update: {
      weight: 100,
      title: "Capacitación de Equipo",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationPeople).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Capacitación de Equipo",
      classification: {
        connect: {
          id: (await objectiveClassificationPeople).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  const objective4_1 = await prisma.objective.upsert({
    where: { id: 8 },
    update: {
      weight: 100,
      title: "Capacitación en Azure",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDevelopment).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Capacitación en Azure",
      classification: {
        connect: {
          id: (await objectiveClassificationDevelopment).id,
        },
      },
      form: {
        connect: {
          id: (await formBoss).id,
        },
      },
    },
  });

  //* OBJETIVOS DE FORMULARIO DE ANDRES
  const objective1_1A = await prisma.objective.upsert({
    where: { id: 9 },
    update: {
      weight: 100,
      title: "Mejorar la eficiencia para realizar más ventas",
      goal: "Mejorar la eficiencia en un 10%.",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDivisionA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Mejorar la eficiencia para realizar más ventas",
      goal: "Mejorar la eficiencia en un 10%.",
      classification: {
        connect: {
          id: (await objectiveClassificationDivisionA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
  });

  const objective2_1A = await prisma.objective.upsert({
    where: { id: 10 },
    update: {
      weight: 100,
      title: "Referir personas para crecimiento de unidad de negocio",
      goal: "Conseguir referir a 15 personas.",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusinessA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Referir personas para crecimiento de unidad de negocio",
      goal: "Conseguir referir a 15 personas.",
      classification: {
        connect: {
          id: (await objectiveClassificationPerBusinessA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
  });

  const objective3_1A = await prisma.objective.upsert({
    where: { id: 11 },
    update: {
      weight: 100,
      title: "Capacitar a compañeros de equipo en actividades de liderazgo",
      goal: "Dedicar 120 horas de actividades de liderazgo.",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationPeopleA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Capacitar a compañeros de equipo en actividades de liderazgo",
      goal: "Dedicar 120 horas de actividades de liderazgo.",
      classification: {
        connect: {
          id: (await objectiveClassificationPeopleA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
  });

  const objective4_1A = await prisma.objective.upsert({
    where: { id: 12 },
    update: {
      weight: 100,
      title: "Completar curso de ciberseguridad",
      goal: "Dedicar 30 horas totales al curso.",
      deactived: false,
      classification: {
        connect: {
          id: (await objectiveClassificationDevelopmentA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
    create: {
      weight: 100,
      title: "Completar curso de ciberseguridad",
      goal: "Dedicar 30 horas totales al curso.",
      classification: {
        connect: {
          id: (await objectiveClassificationDevelopmentA).id,
        },
      },
      form: {
        connect: {
          id: (await formCollaborator).id,
        },
      },
    },
  });

  const comment1 = await prisma.comment.upsert({
    where: { id: 1 },
    update: {
      description: "Excelente objetivo de negocio Andrés",
      deactived: false,
      objective: {
        connect: {
          id: objective1_1A.id,
        },
      },
      commenter :{
        connect: {
          id: userBoss.id,
        },
      }
    },
    create: {
      description: "Excelente objetivo de negocio Andrés",
      commentedAt: new Date(),
      objective: {
        connect: {
          id: objective1_1A.id,
        },
      },
      commenter :{
        connect: {
          id: userBoss.id,
        },
      }
    },
  });

  const comment2 = await prisma.comment.upsert({
    where: { id: 2 },
    update: {
      description: "Considera que tu meta sea de 12 en lugar de 15.",
      deactived: false,
      objective: {
        connect: {
          id: objective2_1A.id,
        },
      },
      commenter :{
        connect: {
          id: userBoss.id,
        },
      }
    },
    create: {
      description: "Considera que tu meta sea de 12 en lugar de 15.",
      commentedAt: new Date(),
      objective: {
        connect: {
          id: objective2_1A.id,
        },
      },
      commenter :{
        connect: {
          id: userBoss.id,
        },
      }
    },
  });

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
