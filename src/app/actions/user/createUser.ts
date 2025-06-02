"use server";

import { prisma } from '@/lib/prisma';

import { ServerActionResponse } from '@/types/ServerActionResponse';
import { CreateUserFormData } from '@/types/User';

import { getRoleById } from '@/lib/fetches/role/getRoleById';
import { getUserById } from '@/lib/fetches/user/getUserById';
import { getDivisionById } from '@/lib/fetches/division/getDivisionById';
import { getBusinessUnitById } from '@/lib/fetches/business_unit/getBusinessUnitById';
import { getAreaById } from '@/lib/fetches/area/getAreaById';

/**
 * * createUserAction() Creates a user given an email and their role.

 * @param prevState<{@link ServerActionResponse}> Initial state of action, set this parameter to null.
 * @param data<{@link CreateUserFormData}> Must include email and roleID.
 *
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createUserAction(
  prevState: ServerActionResponse | null,
  data: CreateUserFormData
): Promise<ServerActionResponse> {

  try {

    //* Just in case to ensure required data
    if (!data.email) {
      throw new Error("email es requerido en 'data'");
    }

    if (!data.roleID) {
      throw new Error("roleID es requerido en 'data'");
    }

    //* Makes sure email in unique
    const user = await prisma.user.findUnique({
      where: {email: data.email, deactivated: false}
    });
    if(user){
      throw new Error("Ya existe un usuario con ese correo")
    };

    //* Checks if inserted role exists
    const role = await getRoleById(parseInt(data.roleID));
    if(!role.id){
        throw new Error("El rol a asignar no existe")
    }

    //* CHECKS FOR OPTIONAL DATA
    //* Check user for boss exists and is a boss
    if(data.bossID){
        const bossExists = await getUserById(parseInt(data.bossID))
        if(!bossExists.id){
            throw new Error("El usuario jefe no existe")
        } else if(!(bossExists.roleID===2 || bossExists.roleID===4 || bossExists.roleID===6 || bossExists.roleID ===7)) {
            throw new Error("El usuario asignado como jefe no es un jefe")
        }
    }

    //* Checks if division exists
    if(data.divisionID){
        const divisionExists = await getDivisionById(parseInt(data.divisionID))
        if(!divisionExists.id){
            throw new Error("La división ingresada no existe")
        }
    }

    //* If there is a business unit there should be a division also
    //* So check for division in data, check bu exists and check bu division is the same as inserted division
    if(data.businessUnitID){

        if(!data.divisionID){
            throw new Error("No se escogió una división para la unidad de negocio")
        }

        const businessUnitExists = await getBusinessUnitById(parseInt(data.businessUnitID))
        if(!businessUnitExists.id){
            throw new Error("La unidad de negocio ingresada no existe")
        }

        if(businessUnitExists.divisionID !== parseInt(data.divisionID)){
            throw new Error("La unidad de negocio no coincide con la división ingresada")
        }
    }

    //* Checks if area exists
    if(data.areaID){
        const areaExists = await getAreaById(parseInt(data.areaID))
        if(!areaExists.id){
            throw new Error("El area ingresada no existe")
        }
    }


    //* A position seniority cannot be an earlier date than the company seniority but it can be the same
    if((data.companySeniority && data.positionSeniority) && (new Date(data.positionSeniority) < new Date(data.companySeniority))){
        throw new Error("La antigüedad en la posición no puede ser una fecha anterior a la antigüedad de la empresa")
    }

    const { roleID, bossID, businessUnitID, areaID, divisionID, ...dataWithoutIDs } = data
    const parsedData = {...dataWithoutIDs,
                        employeeNumber: dataWithoutIDs.employeeNumber ? Number(dataWithoutIDs.employeeNumber) : null,
                        companySeniority: dataWithoutIDs.companySeniority ? new Date(dataWithoutIDs.companySeniority) : null,
                        positionSeniority: dataWithoutIDs.positionSeniority ? new Date(dataWithoutIDs.positionSeniority) : null,
                        jobPosition: dataWithoutIDs.position ? dataWithoutIDs.position : null,
                        fullName: dataWithoutIDs.fullName ? dataWithoutIDs.fullName : dataWithoutIDs.email.split('@')[0],
                        companyContribution: dataWithoutIDs.companyContribution ? dataWithoutIDs.companyContribution : null}
    const {position, ...parsedDataNoPosition} = parsedData

    await prisma.user.create({
      data: {
        ...parsedDataNoPosition,
        role: {
          connect: {
            id: parseInt(data.roleID)
          }
        },
        boss: {
            ...(data.bossID ?
                {
                    connect: {
                        id: parseInt(data.bossID)
                    }
                } : {}
            )
        },
        businessUnit: {
            ...(data.businessUnitID ?
                {
                    connect: {
                        id: parseInt(data.businessUnitID)
                    }
                } : {}
            )
        },
        area: {
            ...(data.areaID ?
                {
                    connect: {
                        id: parseInt(data.areaID)
                    }
                } : {}
            )
        },
      }
    });

    return {success: true, message: "Usuario creado"}

  } catch (error) {
    console.error(`Error when creating user: ${(error as Error).message}`)
    return {success: false, error: `${(error as Error).message}`}
  }
}