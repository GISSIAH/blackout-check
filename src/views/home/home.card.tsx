import Select, { SelectItem } from "@/components/ui/select";
import clsx from "clsx";
import { useAtom } from "jotai";
import { areasAtoms, districtsAtoms, regionsAtoms } from "@/state/data";
import { useEffect, useState } from "react";
import { Area, District } from "@prisma/client";

interface IHomeCard {
  className?: string;
}

const RegionSelect = ({ onChange }: { onChange: (id: string) => void }) => {
  const [renameRegions] = useAtom(regionsAtoms);

  return (
    <Select placeholder="Select Region" onChange={onChange} className="w-full">
      {renameRegions?.map(({ name, id }) => (
        <SelectItem key={id} value={id}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
};

const DistrictsSelect = ({
  districts,
  onChange,
}: {
  districts: District[] | null | undefined;
  onChange: (id: string) => void;
}) => {
  return (
    <Select
      placeholder="Select District"
      disabled={districts == undefined || districts == null}
      onChange={onChange}
      className="w-full"
    >
      {districts?.map(({ name, id }) => (
        <SelectItem key={id} value={name}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
};

const SearchBar = ({ onChange }: { onChange: (value: any | null) => void }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-row">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search"
        className="bg-slate-200 p-2 w-full rounded-lg"
        value={search}
        onChange={(e) => {
          const data = e.target.value;
          onChange(data.length <= 0 ? null : data);
          setSearch(data);
        }}
      />
      {search.length > 0 && (
        <button
          onClick={() => {
            onChange(null);
            setSearch("");
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

const HomeCard = ({ className }: IHomeCard) => {
  const [areas] = useAtom(areasAtoms);
  const [districts] = useAtom(districtsAtoms);
  const [filteredDistrict, setFilteredDistrict] = useState<
    District[] | null | undefined
  >();
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    undefined
  );
  const [isSearching, setIsSearching] = useState(false);
  const [filtedAreas, setFilteredAreas] = useState<Area[] | undefined>();

  useEffect(() => {
    if (selectedRegion === undefined || selectedRegion == null) {
      setFilteredDistrict(null);
    } else {
      setFilteredDistrict(
        districts?.filter((x) => x.regionId === selectedRegion)
      );
    }
  }, [selectedRegion, districts]);

  const onDistrictSelected = (value: string) => {
    setFilteredAreas(areas?.filter((x) => x.districtId == value));
  };

  const OnSearch = (value: string) => {
    setFilteredAreas(
      areas?.filter((x) => x.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return (
    <div className={clsx(className, "p-8 overflow-y-auto")}>
      <div className="h-full bg-white p-2 rounded-2xl">
        <div>
          <SearchBar
            onChange={(value) => {
              if (value !== null) {
                setIsSearching(true);
                OnSearch(value);
              } else {
                setIsSearching(false);
              }
            }}
          />
          {!isSearching && (
            <div className="flex flex-row gap-3 w-full">
              <RegionSelect
                onChange={(value) => {
                  setSelectedRegion(value);
                }}
              />
              <DistrictsSelect
                districts={filteredDistrict}
                onChange={(value) => {
                  onDistrictSelected(value);
                }}
              />
            </div>
          )}

          <div className="h-full mt-2">
            {filtedAreas?.map((area) => (
              <div
                key={area.id}
                className="p-2 bg-slate-200 rounded-lg m-1 cursor-pointer"
              >
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
