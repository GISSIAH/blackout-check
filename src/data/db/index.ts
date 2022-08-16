import { prisma } from "@/prisma/client";
import { GroupWithSchedules } from "@/types";
import { addDays, subDays } from "date-fns";

export const getGroups = async (): Promise<GroupWithSchedules[]> => {
  const data = await prisma.group.findMany({
    select: {
      id: true,
      createdAt: true,
      name: true,
      updatedAt: true,
      schedules: {
        where: {
          start: {
            gte: subDays(Date.now(), 1).toISOString(),
            lte: addDays(Date.now(), 1).toISOString(),
          },
        },
      },
    },
  });
  return data;
};

export const getAreas = async () => {
  const data = await prisma.area.findMany();
  return data;
};

export const getRegions = async () => {
  const data = await prisma.region.findMany();
  return data;
};

export const getDistricts = async () => {
  const data = await prisma.district.findMany();
  return data;
};

export const getAreasWithRequiredData = async () => {
  const data = await prisma.area.findMany({
    include: {
      group: true,
    },
  });

  return data;
};
