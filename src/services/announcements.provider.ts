import { Announcement } from "../entity/Announcement";
import HTTPClient from "./HTTPClient";

export default class AnnouncementsProvider {
    public static async getPage(page: number): Promise<Array<Announcement>> {
        return HTTPClient.GET("announcements/page?page="+page);
    }

    public static async getNew(a?: Announcement): Promise<Array<Announcement>> {
        if (a != null)
            return HTTPClient.GET("announcements/new?latestAnnouncementTime="+a.time);
        return HTTPClient.GET("announcements/new?latestAnnouncementTime="+631152000000);
    }

    public static async search(query: string): Promise<Array<Announcement>> {
        return HTTPClient.GET("announcements/search?query=" + query);
    }
}