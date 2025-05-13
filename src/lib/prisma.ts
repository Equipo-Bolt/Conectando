import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  const prisma: PrismaClient | undefined;
}

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;