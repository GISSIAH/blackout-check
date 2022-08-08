import dynamic from "next/dynamic";
import HomeCard from "@/views/home/home.card";
import { useMediaQuery } from "usehooks-ts";

type Props = {};

const MapWithNoSSR = dynamic(() => import("@/components/map/d3geo"), {
  ssr: false,
});

const MainView = (props: Props) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-row h-full">
      <HomeCard className="md:w-1/3 w-full h-full" />
      {matches && <MapWithNoSSR  />}
    </div>
  );
};

export default MainView;
