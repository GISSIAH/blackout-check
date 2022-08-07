import { prisma } from "@/prisma/client";
export const getGroups = async () => {
  const data = await prisma.groups.findMany();
  return data;
};
