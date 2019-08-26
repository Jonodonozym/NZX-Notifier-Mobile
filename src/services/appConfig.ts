import { Company } from "../entity/Company";
import { AnnouncementType } from "../enum/AnnouncementType";
import { PushNotificationType } from "../enum/PushNotificationType";
import {AsyncStorage} from "react-native";
import {ApplicationConfig} from "../entity/ApplicationConfig";

export default class AppConfig {
    private static config: ApplicationConfig = {
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

    public static getLocal(): ApplicationConfig {
        return AppConfig.config;
    }

    public static async reload(): Promise<ApplicationConfig> {
        return AsyncStorage.getItem('config').then(async function(config){
            if (config != null)
                AppConfig.config = JSON.parse(config)

            let str = await AsyncStorage.getItem('configCompany')
            if (str != null)
                AppConfig.config.companyBlacklist = new Set<Company>(JSON.parse(str))
            else
                AppConfig.config.companyBlacklist = new Set<Company>()

            str = await AsyncStorage.getItem('configType')
            if (str != null)
                AppConfig.config.typeBlacklist = new Set<AnnouncementType>(JSON.parse(str))
            else
                AppConfig.config.typeBlacklist = new Set<AnnouncementType>()

            str = await AsyncStorage.getItem('configKeyword')
            if (str != null)
                AppConfig.config.keywordBlacklist = new Set<string>(JSON.parse(str))
            else
                AppConfig.config.keywordBlacklist = new Set<string>()

            return AppConfig.config
        })
    }

    public static async save() : Promise<any> {
        return AsyncStorage.setItem('config', JSON.stringify(this.config))
    }

    public static async blacklistAddCompany(company: Company): Promise<any> {
        AppConfig.config.companyBlacklist.add(company);
        await AsyncStorage.setItem('configCompany', JSON.stringify([...this.config.companyBlacklist.values()]))
    }

    public static async blacklistRemoveCompany(company: Company): Promise<any> {
        AppConfig.config.companyBlacklist.delete(company);
        await AsyncStorage.setItem('configCompany', JSON.stringify([...this.config.companyBlacklist.values()]))
    }

    public static async blacklistAddType(type: AnnouncementType): Promise<any> {
        AppConfig.config.typeBlacklist.add(type);
        await AsyncStorage.setItem('configType', JSON.stringify([...this.config.typeBlacklist.values()]))
    }

    public static async blacklistRemoveType(type: AnnouncementType): Promise<any> {
        AppConfig.config.typeBlacklist.delete(type);
        await AsyncStorage.setItem('configType', JSON.stringify([...this.config.typeBlacklist.values()]))
    }

    public static async blacklistAddKeyword(keyword: string): Promise<any> {
        AppConfig.config.keywordBlacklist.add(keyword);
        await AsyncStorage.setItem('configKeyword', JSON.stringify([...this.config.keywordBlacklist.values()]))
    }

    public static async blacklistRemoveKeyword(keyword: string): Promise<any> {
        AppConfig.config.keywordBlacklist.delete(keyword);
        await AsyncStorage.setItem('configKeyword', JSON.stringify([...this.config.keywordBlacklist.values()]))
    }
}
