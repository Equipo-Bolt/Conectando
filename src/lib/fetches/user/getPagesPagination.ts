import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";
import { Filter } from "@/types/Filter"

/**
 * * getPagesPagination() gets the number of pages needed to show all users according to filters
 *
 * @param filters (optional) <{@link Filter}> filters which can have name, role id and business unit id
 * @returns Promise of type number which is the number of pages of users according to the filters
 */

const USERS_PER_PAGE = 7;

export async function getPagesPagination(
    filters? : Filter
) {
    try {
        const numberUsers = await prisma.user.count({
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

        if(numberUsers === 0){
            return(1)
        }

        const totalPages = Math.ceil(numberUsers/USERS_PER_PAGE)

        return (totalPages);

    } catch(error) {
        console.error(`Error fetching pages: ${(error as Error).message}`);
        return (1);

    }
}