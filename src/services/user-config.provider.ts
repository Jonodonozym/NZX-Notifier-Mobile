import {UserConfig} from "../entity/UserConfig";
import {Company} from "../entity/Company";
import {AnnouncementType} from "../enum/AnnouncementType";
import {PushNotificationType} from "../enum/PushNotificationType";
import HTTPClient from "./HTTPClient";

export default class UserConfigProvider {
    private static config: UserConfig = {
        companyBlacklist: new Set<Company>(),
        typeBlacklist: new Set<AnnouncementType>(),
        keywordBlacklist: new Set<string>(),

        pushEnabled: true,
        pushType: PushNotificationType[PushNotificationType.VIBRATE],

        alertFrequencyMinutes: 10,

        quietHoursEnabled: false,
        quietHoursStartMinutes: 0,
        quietHoursEndMinutes: 0,
    };

    public static async refresh(): Promise<UserConfig> {
        let promise = HTTPClient.GET("/config");

        promise.then((data) => {
            UserConfigProvider.config = data;
            UserConfigProvider.config.companyBlacklist = new Set<Company>(UserConfigProvider.config.companyBlacklist);
            UserConfigProvider.config.typeBlacklist = new Set<AnnouncementType>(UserConfigProvider.config.typeBlacklist);
            UserConfigProvider.config.keywordBlacklist = new Set<string>(UserConfigProvider.config.keywordBlacklist);
        });

        return promise;
    }

    public static getLocal(): UserConfig {
        return UserConfigProvider.config;
    }

    public static async blacklistAddCompany(company: Company): Promise<any> {
        UserConfigProvider.config.companyBlacklist.add(company);
        return HTTPClient.POST("/config/blacklist/company/add", {companyId: company.id}).catch(e=>{});
    }

    public static async blacklistRemoveCompany(company: Company): Promise<any> {
        UserConfigProvider.config.companyBlacklist.delete(company);
        return HTTPClient.POST("/config/blacklist/company/remove", {companyId: company.id}).catch(e=>{});
    }

    public static async blacklistAddType(type: AnnouncementType): Promise<any> {
        UserConfigProvider.config.typeBlacklist.add(type);
        return HTTPClient.POST("/config/blacklist/type/add", {type: type}).catch(e=>{});
    }

    public static async blacklistRemoveType(type: AnnouncementType): Promise<any> {
        UserConfigProvider.config.typeBlacklist.delete(type);
        return HTTPClient.POST("/config/blacklist/type/remove", {type: type}).catch(e=>{});
    }

    public static async blacklistAddKeyword(keyword: string): Promise<any> {
        UserConfigProvider.config.keywordBlacklist.add(keyword);
        return HTTPClient.POST("/config/blacklist/keyword/add", {keyword: keyword}).catch(e=>{});
    }

    public static async blacklistRemoveKeyword(keyword: string): Promise<any> {
        UserConfigProvider.config.keywordBlacklist.delete(keyword);
        return HTTPClient.POST("/config/blacklist/keyword/remove", {keyword: keyword}).catch(e=>{});
    }

    public static async saveAlertSettings(): Promise<any> {
        return Promise.all([
            HTTPClient.POST("/config/push", {
                enabled: UserConfigProvider.config.pushEnabled,
                type: UserConfigProvider.config.pushType
            }),
            HTTPClient.POST("/config/quietHours", {
                enabled: UserConfigProvider.config.quietHoursEnabled,
                startMinutes: UserConfigProvider.config.quietHoursStartMinutes,
                endMinutes: UserConfigProvider.config.quietHoursEndMinutes
            }),
            HTTPClient.POST("/config/alert", {
                frequencyMinutes: UserConfigProvider.config.alertFrequencyMinutes
            })]
        );
    }
}
