import ServerDetails from "./ServerDetails";

export default class HTTPClient {
    public static async GET(path: string): Promise<any> {
        return fetch(ServerDetails.rootURL + path, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        ).then((response) =>
            response.json()
        ).catch(e => {
            console.log(e);
            throw e
        });
    }
}