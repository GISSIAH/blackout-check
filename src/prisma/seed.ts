import { readFile } from "fs/promises";
import { prisma } from "../prisma/client";

const migrateData = async () => {
  try {
    const groupsData = await readFile(
      "./src/prisma/seeds/groups.seed.json",
      "utf-8"
    );
    const data = JSON.parse(groupsData);

    Object.values(data.regions).forEach(async (region: any) => {
      try {
        const res = await prisma.region.create({
          data: {
            id: region,
            name: region,
            districts: {
              create: [{ id: region, name: region }],
            },
          },
        });
        console.log(res);
      } catch (error) {}
    });
    Object.values(data.groups).forEach(async (group: any) => {
      const res = await prisma.group.create({
        data: group,
      });

      console.log(res);
    });
  } catch (error) {
    console.error(error);
  }
};

migrateData();
