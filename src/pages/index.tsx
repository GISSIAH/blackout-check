import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import MainView from "@/views/home/main";
import { getGroups } from "@/data/db";

const Home: NextPage = (props) => {
  console.log(props);

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

  return {
    props: { groups: JSON.parse(JSON.stringify(groups)) },
    revalidate: 10,
  };
};

export default Home;
