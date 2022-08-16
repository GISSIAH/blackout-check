import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MainView from "@/views/home/main";
import {
  getAreasWithRequiredData,
  getDistricts,
  getGroups,
  getRegions,
} from "@/data/db";
import { Area, District, Group, Region } from "@prisma/client";
import nookies from "nookies";
import { CookiesConstants } from "@/types/constants";
import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  areasAtoms,
  districtsAtoms,
  groupsAtoms,
  regionsAtoms,
} from "@/state/data";

interface IHomeProps {
  areas: Area[];
  regions: Region[];
  districts: District[];
  groups: Group[];
}

const Home: NextPage<IHomeProps> = ({ areas, regions, districts, groups }) => {
  const [_, setAreaData] = useAtom(areasAtoms);
  const [__, setRegionData] = useAtom(regionsAtoms);
  const [___, setDistrictData] = useAtom(districtsAtoms);
  const [____, setGroupData] = useAtom(groupsAtoms);

  useEffect(() => {
    if (areas !== null && areas !== undefined) {
      setAreaData(areas);
    }
  }, [areas, setAreaData]);

  useEffect(() => {
    if (districts !== null && districts !== undefined) {
      setDistrictData(districts);
    }
  }, [districts, setDistrictData]);

  useEffect(() => {
    if (regions !== null && regions !== undefined) {
      setRegionData(regions);
    }
  }, [regions, setRegionData]);

  useEffect(() => {
    if (groups !== null && groups !== undefined) {
      setGroupData(groups);
    }
  }, [groups, setGroupData]);

  return (
    <>
      <Head>
        <title>Black Out Check</title>
        <meta
          name="description"
          content="Check load shedding status for areas within malawi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainView />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const region = nookies.get(ctx, CookiesConstants.UserRegion);

  if (region === undefined || region === null) {
  }

  const regions = await getRegions();
  const areas = await getAreasWithRequiredData();
  const districts = await getDistricts();
  const groups = await getGroups();

  return {
    props: {
      regions: JSON.parse(JSON.stringify(regions)),
      areas: JSON.parse(JSON.stringify(areas)),
      districts: JSON.parse(JSON.stringify(districts)),
      groups: JSON.parse(JSON.stringify(groups)),
    },
  };
};

export default Home;
