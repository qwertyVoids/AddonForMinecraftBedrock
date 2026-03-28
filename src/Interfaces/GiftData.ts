import { ItemType } from "@minecraft/server";

export default interface GiftData {
    type: ItemType,
    total: number;
    residue: number;
}