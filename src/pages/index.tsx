import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import MainView from "@/views/home/main";
import {
  getAreas,
  getAreasWithRequiredData,
  getGroups,
  getRegions,
} from "@/data/db";
import { Area, Group, Region } from "@prisma/client";
import nookies from "nookies";
import { CookiesConstants } from "@/types/constants";
import { useEffect } from "react";
import { Provider, atom, useAtom, useSetAtom } from "jotai";
import { areasAtoms, regionsAtoms } from "@/state/data";

interface IHomeProps {
  areas: Area[];
  regions: Region[];
}

const Home: NextPage<IHomeProps> = ({ areas, regions }) => {
  const [_, setAreaData] = useAtom(areasAtoms);
  const [__, setRegionData] = useAtom(regionsAtoms);

  useEffect(() => {
    if (areas !== null && areas !== undefined) {
      setAreaData(areas);
    }
  }, [areas, setAreaData]);

  useEffect(() => {
    if (regions !== null && regions !== undefined) {
      setRegionData(regions);
    }
  }, [regions, setRegionData]);

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

  return {
    props: {
      regions: JSON.parse(JSON.stringify(regions)),
      areas: JSON.parse(JSON.stringify(areas)),
    },
    // revalidate: 10,
  };
};

export default Home;
