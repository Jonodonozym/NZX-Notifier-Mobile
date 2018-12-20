import { Company } from "../entity/Company";
import HTTPClient from "./HTTPClient";

export class CompanyProvider {
    public static async getAll(): Promise<Array<Company>> {
        return HTTPClient.GET("/companies");
    }

    public static async search(query: string): Promise<Array<Company>> {
        return HTTPClient.GET("/companies/search?query=" + query);
    }
}
