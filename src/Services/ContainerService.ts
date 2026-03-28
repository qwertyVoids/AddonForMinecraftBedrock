import { Container, ItemStack } from "@minecraft/server";

export default class ContainerService {
    public static addItem(container: Container, item: ItemStack): number {
        const itemMaxAmount: number = item.maxAmount;

        let totalCapacity: number = 0;
        for (let i: number = 0; i < container.size; i++) {
            const slot: ItemStack = container.getItem(i) as ItemStack;
            if (!slot) {
                totalCapacity += itemMaxAmount;
            } else if (slot.typeId === item.typeId) {
                totalCapacity += (itemMaxAmount - slot.amount);
            }
        }

        const acceptedAmount: number = Math.min(totalCapacity, item.amount);
        const residue: number = item.amount - acceptedAmount;

        if (acceptedAmount > 0) {
            item.amount = acceptedAmount;
            container.addItem(item);
        }

        return residue;
    }
}