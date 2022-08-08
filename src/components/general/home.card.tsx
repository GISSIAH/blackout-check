import { Schedule } from "@/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

interface IHomeCard {
  className?: string;
}

const HomeCard = ({ className }: IHomeCard) => {
  const { isLoading, error, data } = useQuery<Schedule[]>(
    ["scheduleData"],
    (): Schedule[] => {
      return [{ name: "Jeff", period: "Here", duration: "8" }];
    }
  );

  if (isLoading) return <>Loading</>;

  if (error) return <>An error has occurred</>;

  return (
    <div className={clsx(className, "p-8")}>
      <div className="h-full bg-white p-8 rounded-2xl">
        <div>
          <input type="text" name="" id="" placeholder="Search" />
          <h6>Today</h6>
          {data?.map((daysch, index) => {
            return (
              <div key={index} className="rounded-lg bg-slate-50 p-8">
                <div className="flex flex-col">
                  <td>{daysch.name}</td>
                  <td>{daysch.period}</td>
                  <td>{daysch.duration}</td>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
