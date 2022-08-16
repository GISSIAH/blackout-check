import { GroupWithSchedules } from "@/types";
import { Area, District, Group, Region } from "@prisma/client";
import { atom } from "jotai";

export const areasAtoms = atom<Area[] | undefined>(undefined);
export const districtsAtoms = atom<District[] | undefined>(undefined);
export const groupsAtoms = atom<GroupWithSchedules[] | undefined>(undefined);
export const regionsAtoms = atom<Region[] | undefined>(undefined);
