import {Company} from "./Company";
import {AnnouncementType} from "../enum/AnnouncementType";
import {PushNotificationType} from "../enum/PushNotificationType";

export type UserConfig = {
  companyBlacklist: Set<Company>;
  typeBlacklist: Set<AnnouncementType>;
  keywordBlacklist: Set<string>

  pushEnabled: boolean;
  pushType: PushNotificationType;

  alertFrequencyMinutes: number;

  quietHoursEnabled: boolean;
  quietHoursStartMinutes: number;
  quietHoursEndMinutes: number;
}
