const fs = require("fs/promises");

const readAreas = async () => {
  const data = await fs.readFile("./areas.json", "utf8");
  const json = JSON.parse(data);
  const areas = [];
  const regions = {};

  json.forEach((element) => {
    console.log(element);
    if (element.properties !== undefined) {
      const area = {
        name: element?.properties?.name ?? "",
        geometry: element.geometry,
        group: element?.properties?.group ?? "",
        district: element.properties.district,
      };
      regions[element.properties.district] = element.properties.district;
      areas.push(area);
    }
  });
  const saveData = { areas, regions };
  await fs.writeFile("./areas.seed.json", JSON.stringify(saveData));
  return saveData;
};

const readGroups = async (areas, regions) => {
  const data = await fs.readFile("./groups.json", "utf8");
  const json = JSON.parse(data);
  const groups = {};

  json.forEach((element) => {
    groups[element.name] = {
      name: element.name,
    };
  });

  areas.forEach((element) => {
    const group = groups[element.group];
    const area = {
      name: element.name,
      geometry: element.geometry,
      district: {
        connect: {
          id: element.district,
        },
      },
    };
    if (group.areas === undefined || group.areas === null) {
      group.areas = {
        create: [area],
      };
    } else {
      group.areas.create.push(area);
    }
    groups[element.group] = group;
  });
  await fs.writeFile(
    "./groups.seed.json",
    JSON.stringify({ groups, regions })
  );
  return groups;
};

const workOnData = async () => {
  try {
    const data = await readAreas();
    await readGroups(data.areas, data.regions);
  } catch (err) {
    console.error(err);
  }
};

workOnData();
