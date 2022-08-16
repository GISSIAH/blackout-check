import { Area, District, Group, Region, Schedule } from "@prisma/client";

export interface GroupWithSchedules extends Group {
  schedules: Schedule[];
}
