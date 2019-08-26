import { Announcement } from "../entity/Announcement";
import AppConfig from "./appConfig";
import AnnouncementsProvider from "./announcements.provider";


export default class AnnouncementRepo {
    public static filteredAnnouncements: Array<Announcement> = Array<Announcement>()

    private static announcements: Array<Announcement> = Array<Announcement>()
    private static page: number = 0

    public static isFetching: boolean = false
    public static isConnected: boolean = true

    public static setAnnouncements(announcements: Array<Announcement>) {
        this.announcements = announcements
        this.filteredAnnouncements = this.filter(announcements)
    }

    public static clear() {
        this.announcements = []
        this.filteredAnnouncements = []
        this.page = 0
        this.isFetching = false
    }

    public static setToFirstPage(): Promise<void> {
        this.isFetching = true
        return this.checkForErrors(AnnouncementsProvider.getPage(0).then((page) => {
            this.setAnnouncements(this.announcements.concat(page))
            this.isConnected = true
            this.isFetching = false
            this.page = 0
        }))
    }

    public static fetchNew(): Promise<void> {
        if (this.announcements.length == 0)
            return this.setToFirstPage()
        return this.checkForErrors(AnnouncementsProvider.getNew(this.announcements[0]).then((newAnnouncements)=> {
            this.setAnnouncements(newAnnouncements.concat(this.announcements))
            this.isConnected = true
        }))
    }

    public static fetchNextPage(): Promise<void> {
        return this.checkForErrors(AnnouncementsProvider.getPage(this.page+1).then((nextPage) => {
            this.setAnnouncements(this.announcements.concat(nextPage))
            this.page++
            this.isConnected = true
        }))
    }

    public static search(search: string): Promise<void> {
        return this.checkForErrors(AnnouncementsProvider.search(search).then((ann) => {
            this.setAnnouncements(ann)
            this.isConnected = true
        }))
    }

    private static checkForErrors(p: Promise<any>) : Promise<void> {
        return p.catch((e) => {
            this.isFetching = false
            this.isConnected = false
            this.clear()
            this.filteredAnnouncements = []
            console.log(e)
        })
    }

    public static updateFilter() {
        this.filteredAnnouncements = this.filter(this.announcements)
    }

    public static filter(announcements: Array<Announcement>) : Array<Announcement> {
        return announcements
            .filter((a)=> {
                if (AppConfig.getLocal().companyBlacklist.has(a.company))
                    return false
                if (AppConfig.getLocal().typeBlacklist.has(a.type))
                    return false

                var containsKeyword = false
                AppConfig.getLocal().keywordBlacklist.forEach((keyword)=> {
                    if (a.title.includes(keyword)) {
                        containsKeyword = true
                        return
                    }
                })
                return !containsKeyword
            })
    }
}