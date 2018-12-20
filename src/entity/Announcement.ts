import { AnnouncementType } from "../enum/AnnouncementType";
import { Company } from "./Company";

export type Announcement = {
  id: number;
  company: Company;
  title: string;
  url: string;
  pdfurl: string;
  type: AnnouncementType;
  time: number;
}
