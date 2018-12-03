import {AsyncStorage} from "react-native"
import DeviceInfo from 'react-native-device-info';

export default class DeviceDetails {
    public static async setID(ID: string) {
        await AsyncStorage.setItem('ID', ID).then((data)=> ID );
    }

    public static async getID(): Promise<string | null> {
        return AsyncStorage.getItem('ID');
    }

    public static async getName(): Promise<string> {
        return DeviceInfo.getDeviceName();
    }
}