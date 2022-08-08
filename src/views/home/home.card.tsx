import Select, { SelectItem } from "@/components/ui/select";
import clsx from "clsx";
import { useAtom } from "jotai";
import { areasAtoms, regionsAtoms } from "@/state/data";
import { useEffect, useState } from "react";
import { Area, Region } from "@prisma/client";

interface IHomeCard {
  className?: string;
}

const RegionSelect = ({}: { onChange: (id: string) => void }) => {
  const [groups] = useAtom(regionsAtoms);

  return (
    <Select placeholder="Select Region">
      {groups?.map(({ name, id }) => (
        <SelectItem key={id} value={name}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
};

const HomeCard = ({ className }: IHomeCard) => {
  const [areas, setAreas] = useAtom(areasAtoms);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    undefined
  );
  const [filtedAreas, setFilteredAreas] = useState<Area[] | undefined>();
  
  useEffect(() => {
    setFilteredAreas(areas);
    if (selectedRegion === undefined || selectedRegion == null) {
    } else {
    }
  }, [areas, selectedRegion]);

  return (
    <div className={clsx(className, "p-8 overflow-y-auto")}>
      <div className="h-full bg-white p-2 rounded-2xl">
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="bg-slate-200 p-2 w-full rounded-lg"
          />
          <h6>Today</h6>
          <RegionSelect
            onChange={(value) => {
              setSelectedRegion(value);
            }}
          />
          <div className="h-full mt-2">
            {filtedAreas?.map((area) => (
              <div key={area.id} className="p-2 bg-slate-200 rounded-lg m-1 cursor-pointer">
                {area.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
