import DeviceDetails from "./device-details.provider";
import ServerDetails from "./server-details.provider";

const base64 = require('base-64');

export default class AuthService {
    public static isRegistered(): Promise<boolean> {
        return DeviceDetails.getID().then((id) => id != null);
    }

    public static register(): Promise<string> {
        let promise = fetch(ServerDetails.rootURL + "/auth/register", {
                method: 'POST',
                headers: new Headers(),
                body: JSON.stringify({
                    deviceName: DeviceDetails.getName()
                })
            }
        ).then((response) =>
            response.text()
        );

        promise.then((text) =>
            DeviceDetails.setID(text)
        );

        return promise;
    }

    public static async getAuthHeader(): Promise<Headers> {
        let headers = new Headers({
            "Authorization": "Basic " + base64.encode(await DeviceDetails.getID() + ":"),
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        });
        return headers;
    }
}
