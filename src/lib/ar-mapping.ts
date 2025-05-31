import { SectionStatus } from "./store/debate-sections";

export const teamsMapping = [
  {
    value: "proposition",
    label: "الموالاة",
  },
  {
    value: "opposition",
    label: "المعارضة",
  },
];

export const statusMapping: Record<SectionStatus, string> = {
  completed: "انتهت",
  started: "بدأت",
  "not started": "لم تبدأ",
};
