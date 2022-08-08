import { prisma } from "@/prisma/client";

export const getGroups = async () => {
  const data = await prisma.groups.findMany();
  return data;
};

export const getAreas = async () => {
  const data = await prisma.areas.findMany();
  return data;
};
