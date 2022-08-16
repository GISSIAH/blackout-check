import { GroupInfoSchedule } from "@/components/schedule";
import Tabs, { Tab, TabContent } from "@/components/ui/tabs";
import { areasAtoms, districtsAtoms, groupsAtoms } from "@/state/data";
import { GroupWithSchedules } from "@/types";
import { Area, District, Group, Schedule } from "@prisma/client";
import clsx from "clsx";
import { addDays, isSameDay } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

type Props = {};

const FilterGroupData = ({
  areas,
  group,
  districts,
}: {
  areas?: Area[];
  districts?: District[];
  group: GroupWithSchedules;
}) => {
  const [groupedAreas, setGroupedAreas] =
    useState<{ district: District; areas: Area[] }[]>();
  useEffect(() => {
    const disData: any = {};
    const data = areas?.filter((x) => x.groupId == group.id);
    data?.forEach((e) => {
      const hold = disData[e.districtId];

      if (hold == undefined || hold == null) {
        disData[e.districtId] = {
          district: districts?.find((x) => x.id == e.districtId),
          areas: [e],
        };
      } else {
        disData[e.districtId].areas.push(e);
      }
    });
    setGroupedAreas(Object.values(disData));
  }, [areas, districts, group]);
  return (
    <div>
      <GroupInfoSchedule className="w-full" group={group} />
      {!groupedAreas && <p>List empty</p>}
      {groupedAreas?.map((districtArea) => (
        <div key={districtArea.district.id}>
          <h6 className="text-lg my-3 font-medium">
            {districtArea.district.name}
          </h6>
          <div className="flex flex-col gap-3">
            {districtArea.areas.map((area) => (
              <div key={area.id} className="p-2 bg-slate-300 rounded-lg">
                {area.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const GroupTabsView = (props: Props) => {
  const [groups] = useAtom(groupsAtoms);
  const [areas] = useAtom(areasAtoms);
  const [districts] = useAtom(districtsAtoms);

  return (
    <div className="h-full">
      {groups && (
        <Tabs
          tabs={groups
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <Tab key={group.id}>{group.name}</Tab>
            ))}
          classNames=""
          panelClassNames="h-full overflow-y-scroll overscroll-contain"
        >
          <AnimatePresence exitBeforeEnter>
            {groups.map((group) => (
              <TabContent key={group.id} className="h-full pb-10">
                <FilterGroupData
                  group={group}
                  areas={areas}
                  districts={districts}
                />
              </TabContent>
            ))}{" "}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};

export default GroupTabsView;
