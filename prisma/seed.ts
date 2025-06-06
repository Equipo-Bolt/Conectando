import { prisma } from "@/lib/prisma";
import * as fs from "fs";

/*
    ! In this file, catalogs and preliminary records will be declared to populate the db
    
    * First, we will be include the catalogs
    * Next, entities using upsert function.
*/

async function main() {
  //! ------------------------- Catalogs --------------------------------------

  const rawAreas = process.env.AREA_SECURE ?? '';
  const rawBusinessUnits = process.env.BU_SECURE ?? '';
  const rawClasifications = process.env.CLASSIFICATION_SECURE ?? '';
  const rawDivisions = process.env.DIVISIONS_SECURE ?? '';
  const rawProgresses = process.env.PROGRESSES_SECURE ?? '';
  const rawRoles = process.env.ROLES_SECURE ?? '';
  const rawPeriods = process.env.PERIODS_SECURE ?? '';

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
      update: { title, deactivated: false },
    });
  }

  for (const title of catalogDivisions) {
    await prisma.division.upsert({
      where: { title },
      create: { title },
      update: { title, deactivated: false },
    });
  }

  for (const bu of catalogBusinessUnits) {
    await prisma.businessUnit.upsert({
      where: { title: bu.title },
      create: { title: bu.title, divisionID: bu.divisionID },
      update: {
        title: bu.title,
        divisionID: bu.divisionID,
        deactivated: false,
      },
    });
  }

  for (const title of catalogClasifications) {
    await prisma.classification.upsert({
      where: { title },
      create: { title },
      update: { title, deactivated: false },
    });
  }

  for (const title of catalogProgresses) {
    await prisma.progress.upsert({
      where: { title },
      create: { title },
      update: { title, deactivated: false },
    });
  }

  for (const title of catalogRoles) {
    await prisma.role.upsert({
      where: { title },
      create: { title },
      update: { title, deactivated: false },
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
        deactivated: false,
      },
    });
  }
  //! ------------------------- Catalogs --------------------------------------

  //! ------------------------- Dummy Data -------------------------------}

  //* Users
  const userBoss = await prisma.user.upsert({
    where: { email: "daniel@gemso.com" },
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
      deactivated: false,
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
          email: "juanG@gemso.com",
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
    where: { email: "andres@gemso.com" },
    update: {
      fullName: "Andrés Sandoval Ibarra",
      email: "andres@gemso.com",
      jobPosition: "Coordinado de Puesto TI",
      positionSeniority: new Date("2025-04-20"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Soy muy chilo",
      deactivated: false,
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
    where: { email: "colab2@gemso.com" },
    update: {
      fullName: "Colaborador Dos",
      email: "colab2@gemso.com",
      jobPosition: "Lider de Redes Sociales",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2023-01-26"),
      companyContribution: "Chambeo muy padre",
      deactivated: false,
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
    where: { email: "colab3@gemso.com" },
    update: {
      fullName: "Colaborador Tres",
      email: "colab3@gemso.com",
      jobPosition: "Intern",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2025-02-01"),
      companyContribution: "Aprendo y aprendo",
      deactivated: false,
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
    where: { email: "colab4@gemso.com" },
    update: {
      fullName: "Colaborador Cuatro",
      email: "colab4@gemso.com",
      jobPosition: "Tester de Producto",
      positionSeniority: new Date("2025-02-01"),
      companySeniority: new Date("2024-08-11"),
      companyContribution: "Aseguro la calidad",
      deactivated: false,
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
    where: { email: "colab5@gemso.com" },
    update: {
      fullName: "Colaborador Sin Formulario",
      email: "colab5@gemso.com",
      jobPosition: "Ayudante de intern",
      positionSeniority: new Date("2025-04-01"),
      companySeniority: new Date("2024-04-01"),
      companyContribution: "Soy nuevo nuevo nuevo",
      deactivated: false,
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
    where: { email: "colab6@gemso.com" },
    update: {
      fullName: "Colaborador Con Formulario Sin Objetivos",
      email: "colab6@gemso.com",
      jobPosition: "Compras",
      positionSeniority: new Date("2025-04-02"),
      companySeniority: new Date("2024-04-02"),
      companyContribution: "No hice mis objetivos",
      deactivated: false,
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
      deactivated: false,
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

  const userAdministrator1 = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {
      fullName: "Administrador Gemso",
      email: process.env.ADMIN_EMAIL,
      jobPosition: "Administración",
      positionSeniority: new Date("2025-04-12"),
      companySeniority: new Date("2024-04-12"),
      companyContribution: "Administro la super aplicación de Conectando+.",
      deactivated: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 6,
        },
      },
      businessUnit: {
        connect: {
          id: 7,
        },
      },
      area: {
        connect: {
          id: 11,
        },
      },
    },
    create: {
      employeeNumber: 99999,
      fullName: "Administrador Gemso",
      email: process.env.ADMIN_EMAIL,
      jobPosition: "Administración",
      positionSeniority: new Date("2025-04-12"),
      companySeniority: new Date("2024-04-12"),
      companyContribution: "Administro la super aplicación de Conectando+.",
      deactivated: false,
      boss: {
        connect: {
          id: (await userBoss).id,
        },
      },
      role: {
        connect: {
          id: 6,
        },
      },
      businessUnit: {
        connect: {
          id: 7,
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
      deactivated: false,
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
      deactivated: false,
      collaborator: {
        connect: {
          id: (await userBoss).id,
        },
      },
      evaluator: {
        connect: {
          email: "juanG@gemso.com",
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
          email: "juanG@gemso.com",
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
      deactivated: false,
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
      deactivated: false,
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

  const formCollaborator5 = await prisma.form.upsert({
    where: { id: 5 },
    update: {
      deactivated: false,
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 1,
          },
        },
      },
      create: {
        weight: 70,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 2,
          },
        },
      },
      create: {
        weight: 10,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 3,
          },
        },
      },
      create: {
        weight: 10,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 4,
          },
        },
      },
      create: {
        weight: 10,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 1,
          },
        },
      },
      create: {
        weight: 25,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 2,
          },
        },
      },
      create: {
        weight: 50,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 3,
          },
        },
      },
      create: {
        weight: 10,
        classificationCatalog: {
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
        deactivated: false,
        classificationCatalog: {
          connect: {
            id: 4,
          },
        },
      },
      create: {
        weight: 15,
        classificationCatalog: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objectiveClassification: {
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
      objectiveClassification: {
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
      deactivated: false,
      objective: {
        connect: {
          id: objective1_1A.id,
        },
      },
      commenter: {
        connect: {
          id: userBoss.id,
        },
      },
    },
    create: {
      description: "Excelente objetivo de negocio Andrés",
      commentedAt: new Date(),
      objective: {
        connect: {
          id: objective1_1A.id,
        },
      },
      commenter: {
        connect: {
          id: userBoss.id,
        },
      },
    },
  });

  const comment2 = await prisma.comment.upsert({
    where: { id: 2 },
    update: {
      description: "Considera que tu meta sea de 12 en lugar de 15.",
      deactivated: false,
      objective: {
        connect: {
          id: objective2_1A.id,
        },
      },
      commenter: {
        connect: {
          id: userBoss.id,
        },
      },
    },
    create: {
      description: "Considera que tu meta sea de 12 en lugar de 15.",
      commentedAt: new Date(),
      objective: {
        connect: {
          id: objective2_1A.id,
        },
      },
      commenter: {
        connect: {
          id: userBoss.id,
        },
      },
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
