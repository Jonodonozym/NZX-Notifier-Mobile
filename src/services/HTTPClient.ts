import AuthService from "./auth.service";
import ServerDetails from "./server-details.provider";

export default class HTTPClient {
    public static async GET(path: string): Promise<any> {
        return fetch(ServerDetails.rootURL + path, {
                method: 'GET',
                headers: await AuthService.getAuthHeader()
            }
        ).then((response) =>
            response.json()
        ).catch(e => {
            console.log(e);
            throw e
        });
    }

    public static async POST(path: string, body: any): Promise<any> {
        return fetch(ServerDetails.rootURL + path, {
                method: 'POST',
                headers: await AuthService.getAuthHeader(),
                body: JSON.stringify(body)
            }
        ).then((response) =>
            response.json()
        ).catch(e => {
            console.log(e);
            throw e
        });
    }
}