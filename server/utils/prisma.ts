import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

if (import.meta.dev) globalPrisma.prisma = prisma;
