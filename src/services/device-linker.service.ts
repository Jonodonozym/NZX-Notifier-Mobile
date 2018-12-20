import { Device } from "../entity/Device";
import DeviceDetails from "./device-details.provider";
import HTTPClient from "./HTTPClient";

export default class DeviceLinker {

    public static async getLinkedDevices(): Promise<Array<Device>> {
        return HTTPClient.GET("/devicelink/linked");
    }

    public static async joinAccount(deviceID: string): Promise<Device> {
        return HTTPClient.POST("/devicelink/join", { "deviceID": deviceID });
    }

    public static async unlinkSelf(): Promise<Device> {
        return DeviceDetails.getID().then((id) => this.unlink(id!));
    }

    public static async unlink(deviceID: string): Promise<Device> {
        return HTTPClient.POST("/devicelink/unlink", { "deviceID": deviceID });
    }
}
