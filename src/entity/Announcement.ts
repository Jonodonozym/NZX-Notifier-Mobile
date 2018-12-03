import {Company} from "./Company";
import {AnnouncementType} from "../enum/AnnouncementType";

export type Announcement = {
  id: number;
  company: Company;
  title: string;
  url: string;
  pdfurl: string;
  type: AnnouncementType;
  time: number;
}
