import dynamic from "next/dynamic";
import HomeCard from "@/views/home/home.card";
import { useMediaQuery } from "usehooks-ts";

type Props = {};

const MapWithNoSSR = dynamic(() => import("@/components/map/reaflet"), {
  ssr: false,
});

const MainView = (props: Props) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-row h-full">
      <HomeCard className="md:w-7/12 w-full h-full" />
      {matches && <MapWithNoSSR className="w-full h-full" />}
    </div>
  );
};

export default MainView;
