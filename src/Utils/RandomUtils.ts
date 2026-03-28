import { ItemStack, ItemType, ItemTypes } from "@minecraft/server";

export default class RandomUtils {
    public static getRandomItem(): ItemStack {
        const allItems: ItemType[] = ItemTypes.getAll();
        const randomItem: ItemType = allItems[Math.floor(Math.random() * allItems.length)];
        return new ItemStack(randomItem, 1);
    }

    public static getRandomItemAmount(item: ItemStack): number {
        return Math.floor(Math.random() * item.maxAmount) + 1;
    }
}