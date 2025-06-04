import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";
import { Filter } from "@/types/Filter"

/**
 * * getUsersPaginationFilters() gets all created and not deactivated users given a page in params and optional filters
 *
 * @param pagination<string> current page in pagination
 * @param filters (optional) <{@link Filter}> filters which can have name, role id and business unit id
 * @returns Promise of type {@link User}[] which contains the 10 users according to the page
 */

const USERS_PER_PAGE = 10;

export async function getUsersPaginationFilters(
    pagination: string,
    filters? : Filter
) {
    try {
        const page = parseInt(pagination);
        if (isNaN(page) || page <= 0) {
            throw new Error("Página inválida")
        }

        const users = await prisma.user.findMany({
            skip: USERS_PER_PAGE * (page-1),
            take: USERS_PER_PAGE,
            where: {
                deactivated: false,
                AND: [
                    ...(filters && filters.name ? [{
                        fullName: { contains: filters.name}
                    }] : []),

                    ...(filters && filters.roleID ? [{
                        roleID: parseInt(filters.roleID)
                    }] : []),

                    ...(filters && filters.businessUnitID ? [{
                            businessUnitID: parseInt(filters.businessUnitID)
                    }] : [])
                ]
            }
        })

        if(users.length === 0){
            return ([] as User[]);
        }

        return (users as User[]);

    } catch(error) {
        console.error(`Error fetching users: ${(error as Error).message}`);
        return ([] as User[]);

    }
}