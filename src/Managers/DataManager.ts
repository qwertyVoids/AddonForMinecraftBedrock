import { Player, Vector3 } from "@minecraft/server";
import PropertyKeys from "../Enumerations/PropertyKeys";

export default class DataManager {
    public static getValue<T>(player: Player, key: PropertyKeys): T | undefined {
        return player.getDynamicProperty(key) as T | undefined;
    }

    public static setValue<T extends boolean | number | string | Vector3 | undefined>(player: Player, key: PropertyKeys, value: T): void {
        player.setDynamicProperty(key, value);
    }

    public static getJSONData<T>(player: Player, key: PropertyKeys): T {
        const dataRaw: string = player.getDynamicProperty(key) as string;
        if (!dataRaw) return {} as T;

        try {
            return JSON.parse(dataRaw) as T;
        } catch (e) {
            console.warn(`[DataManager] JSON parsing error for key ${key}: ${e}`);
            return {} as T;
        }
    }

    public static updateJSONData<T>(player: Player, key: PropertyKeys, updateFn: (currentData: T) => T): void {
        const currentData: T = this.getJSONData<T>(player, key);
        const newData: T = updateFn(currentData);
        this.saveJSONData<T>(player, key, newData);
    }

    private static saveJSONData<T>(player: Player, key: PropertyKeys, data: T): void {
        player.setDynamicProperty(key, JSON.stringify(data));
    }
}