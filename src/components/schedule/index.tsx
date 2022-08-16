import { GroupWithSchedules } from "@/types";
import { Schedule } from "@prisma/client";
import clsx from "clsx";
import { addDays, isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isBetween);
dayjs.extend(relativeTime);

const TodaySchedule = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div>
      {(() => {
        if (dayjs(new Date()).isBetween(schedule.start, schedule.end)) {
          return <div>started</div>;
        } else if (dayjs(new Date()).isBefore(schedule.start)) {
          return (
            <div>
              <p>{dayjs(schedule.start).toNow()}</p>
            </div>
          );
        } else {
          return <div>completed</div>;
        }
      })()}
      <h6>{schedule.start.toDateString()}</h6>
    </div>
  );
};

export const GroupInfoSchedule = ({
  className,
  group,
}: {
  className?: string;
  group: GroupWithSchedules;
}) => {
  const [dates, setDates] = useState<{
    today?: Schedule;
    yesterday?: Schedule;
  }>({});

  useEffect(() => {
    group.schedules.forEach((sch) => {
      const schDate = new Date(sch.start);
      // TODO: Stop prisma from giving use string instead of Date
      const schedule: Schedule = {
        ...sch,
        start: new Date(sch.start),
        end: new Date(sch.end),
      };
      if (isSameDay(new Date(), schDate)) {
        setDates({ ...dates, today: schedule });
      } else if (isSameDay(addDays(new Date(), 1), schDate)) {
        setDates({ ...dates, yesterday: schedule });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  return (
    <div className={clsx(className, "")}>
      <div>
        <h5 className="font-bold text-lg mb-2">Group {group.name}</h5>
        {dates.today ? (
          <TodaySchedule schedule={dates.today} />
        ) : (
          <div>No Blackout today? Maybe</div>
        )}
      </div>
      <div></div>
    </div>
  );
};
