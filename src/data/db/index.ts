import { prisma } from "@/prisma/client";

export const getGroups = async () => {
  const data = await prisma.group.findMany();
  return data;
};

export const getAreas = async () => {
  const data = await prisma.area.findMany();
  return data;
};


export const getRegions = async () => {
  const data = await prisma.region.findMany()
  return data
}

export const getRegionsAndDistricts = async () => {
  const data = await prisma.region.findMany({ include : {
    
  }})
}