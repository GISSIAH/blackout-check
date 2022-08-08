import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import MainView from "@/views/home/main";
import { getAreas, getGroups } from "@/data/db";
import { Areas, Groups } from "@prisma/client";

interface IHomeProps {
  areas: Areas[];
  groups: Groups[];
}

const Home: NextPage<IHomeProps> = ({ areas, groups }) => {
  
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

export const getStaticProps: GetStaticProps = async () => {
  const groups = await getGroups();
  const areas = await getAreas();

  return {
    props: {
      groups: JSON.parse(JSON.stringify(groups)),
      areas: JSON.parse(JSON.stringify(areas)),
    },
    revalidate: 10,
  };
};

export default Home;
