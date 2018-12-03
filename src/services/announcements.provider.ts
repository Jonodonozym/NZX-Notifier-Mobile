import {Announcement} from "../entity/Announcement";
import HTTPClient from "./HTTPClient";

export default class AnnouncementsProvider {
    public static async getRecent(offset: number): Promise<Array<Announcement>> {
        return HTTPClient.GET("/announcements/recent?offset=" + offset);
    }

    public static async getNew(): Promise<Array<Announcement>> {
        return HTTPClient.GET("/announcements/new");
    }

    public static async search(query: string): Promise<Array<Announcement>> {
        return HTTPClient.GET("/announcements/search?query=" + query);
    }
}