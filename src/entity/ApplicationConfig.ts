import { AnnouncementType } from "../enum/AnnouncementType";
import { Company } from "./Company";

export type ApplicationConfig = {
  companyBlacklist: Set<Company>;
  typeBlacklist: Set<AnnouncementType>;
  keywordBlacklist: Set<string>

  pushEnabled: boolean;
  pushType: string;

  alertFrequencyMinutes: number;

  quietHoursEnabled: boolean;
  quietHoursStartMinutes: number;
  quietHoursEndMinutes: number;
}
