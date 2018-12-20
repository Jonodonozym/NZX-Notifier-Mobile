import {Announcement} from "../entity/Announcement";
import HTTPClient from "./HTTPClient";

export default class AnnouncementsProvider {
    public static async getRecent(lastId?: number): Promise<Array<Announcement>> {
        if (!lastId)
            return HTTPClient.GET("/announcements/recent");
        return HTTPClient.GET("/announcements/recent?startID=" + (lastId - 1));
    }

    public static async getNew(): Promise<Array<Announcement>> {
        return HTTPClient.GET("/announcements/new");
    }

    public static async search(query: string): Promise<Array<Announcement>> {
        return HTTPClient.GET("/announcements/search?query=" + query);
    }
}