"use server"

import { prisma } from '@/lib/prisma';

//TODO Should use interface to create object and adapt this action to work with useActionState hook.
export async function createUserActionDP(data: FormData) {

    //* Create object to later use interface
    const newUser = {
      employeeNumber: data.get("employeeNumber") ? Number(data.get("employeeNumber")) : null,
      fullName: data.get("fullName") as string || null,
      email: data.get("email") as string || null,
      jobPosition: data.get("position") as string || null,
      positionSeniority: data.get("positionSeniority") ? new Date(data.get("positionSeniority") as string) : null,
      companySeniority: data.get("companySeniority") ? new Date(data.get("companySeniority") as string) : null,
      companyContribution: data.get("companyContribution") as string || null,
      bossID: data.get("bossId") ? Number(data.get("bossId")) : null,
      businessUnitID: data.get("businessUnitId") ? Number(data.get("businessUnitId")) : null,
      areaID: data.get("areaId") ? Number(data.get("areaId")) : null
    };

    const missingFields = Object.entries(newUser)
      .filter(([_, value]) => value === null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`The following fields are missing in the new user data: ${missingFields.join(', ')}`);
    }

    try {
      const userExists = await prisma.user.findFirst({
        where: {
          OR: [
            { employeeNumber: newUser.employeeNumber },
            { email: newUser.email },
          ]
        }
      })

      if (userExists) {
        throw new Error('User with the same employee number or email already exists');
      }
    
      await prisma.user.create({
        data: {
          employeeNumber: newUser.employeeNumber,
          fullName: newUser.fullName,
          email: newUser.email,
          jobPosition: newUser.jobPosition,
          positionSeniority: newUser.positionSeniority,
          companySeniority: newUser.companySeniority,
          companyContribution: newUser.companyContribution,
            ...(newUser.bossID !== null && {
              boss: {
                connect: {
                  id: newUser.bossID
                }
              }
            }),
          ...(newUser.businessUnitID !== null && {
            businessUnit: {
              connect: {
                id: newUser.businessUnitID
              }
            }
          }),
          ...(newUser.areaID !== null && {
            area: {
              connect: {
                id : newUser.areaID
              }
            }
          })
        }
      });

      return "User Has been created";
    } catch (error) {
      throw new Error("Failed to create User");
    }
} 