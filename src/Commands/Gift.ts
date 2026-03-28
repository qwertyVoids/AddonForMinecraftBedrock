import {
    ChatSendBeforeEvent,
    Container,
    EntityComponentTypes,
    ItemStack,
    ItemType,
    ItemTypes,
    Player
} from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import StringUtils from "../Utils/StringUtils";
import DataManager from "../Managers/DataManager";
import PropertyKeys from "../Enumerations/PropertyKeys";
import RandomUtils from "../Utils/RandomUtils";
import ContainerService from "../Services/ContainerService";
import ItemData from "../Interfaces/ItemData";
import GiftData from "../Interfaces/GiftData";

class GiftCommand extends Command {
    public readonly name: string = "Gift";
    public readonly commandName: string = "gift";
    public readonly description: string = "Дарит вам подарок раз в пол часа";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["free"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const inventory: Container | undefined = player.getComponent(EntityComponentTypes.Inventory)?.container;

        if (!inventory) {
            return this.error(player, commandName, "Ошибка инициализации инвентаря!");
        }

        const hasItemsBefore: boolean = Object.keys(DataManager.getJSONData<Record<string, ItemData>>(player, PropertyKeys.StoredItems)).length > 0;
        const lastClaimed: number = DataManager.getValue<number>(player, PropertyKeys.GiftLastClaimed) ?? 0;
        const nextTime: number = lastClaimed + 30 * 60 * 1000;
        const isTimePassed: boolean = Date.now() >= nextTime;
        let giftData: GiftData | undefined = undefined;

        if (isTimePassed) {
            DataManager.setValue<number>(player, PropertyKeys.GiftLastClaimed, Date.now());
            const randomItem: ItemStack = RandomUtils.getRandomItem();
            const randomAmount: number = RandomUtils.getRandomItemAmount(randomItem);
            randomItem.amount = randomAmount;

            const residue: number = ContainerService.addItem(inventory, randomItem);
            giftData = { type: randomItem.type, total: randomAmount, residue };

            if (residue > 0) {
                DataManager.updateJSONData<Record<string, ItemData>>(player, PropertyKeys.StoredItems, (data: Record<string, ItemData>): Record<string, ItemData> => {
                    const id: string = randomItem.typeId;
                    if (data[id]) {
                        data[id].amount += residue;
                    } else {
                        data[id] = { id, amount: residue };
                    }

                    return data;
                });
            }
        }

        const recoveredItems: string[] = [];
        let hasItemsAfter: boolean = false;

        DataManager.updateJSONData<Record<string, ItemData>>(player, PropertyKeys.StoredItems, (data: Record<string, ItemData>): Record<string, ItemData> => {
            for (const id in data) {
                const itemData: ItemData = data[id];
                const type: ItemType = ItemTypes.get(itemData.id) as ItemType;
                if (!type) continue;

                const item: ItemStack = new ItemStack(type, itemData.amount);
                const residue: number = ContainerService.addItem(inventory, item);

                if (residue < itemData.amount) {
                    const added: number = itemData.amount - residue;
                    recoveredItems.push(`§a${added} ${id.split(":")[1].replace(/_/g, " ")}§f`);

                    if (residue === 0) {
                        delete data[id];
                    } else {
                        itemData.amount = residue;
                        hasItemsAfter = true;
                    }
                } else {
                    hasItemsAfter = true;
                }
            }

            return data;
        });

        let message: string = "";
        if (giftData) {
            const giftName: string = giftData.type.id.split(":")[1].replace(/_/g, " ");
            const formattedGift: string = `(§a${giftData.total} ${giftName}§f)`;
            if (giftData.residue === 0) {
                message = `§aПодарок§f ${formattedGift} §aуспешно получен§f!`;
            } else if (giftData.residue === giftData.total) {
                message = `§cВаш инвентарь полностью заполнен§f! §aПодарок§f ${formattedGift} §aотправлен в хранилище§f.`;
            } else {
                message = `Часть предметов выдалась, а §a${giftData.residue} шт.§f (а именно §a${giftName}§f) было положено в хранилище.`;
            }
        } else {
            const time: number = Math.ceil((nextTime - Date.now()) / 1000);
            const minutes: number = Math.floor(time / 60);
            const seconds: number = time % 60;
            const mStr: string = StringUtils.getPlural(minutes, "минуту", "минуты", "минут");
            const sStr: string = StringUtils.getPlural(seconds, "секунду", "секунды", "секунд");

            message = `Время ещё не прошло. Заходи через §e${minutes} ${mStr}§f и §e${seconds} ${sStr}§f.`;
        }

        if (recoveredItems.length > 0) {
            message += `\n§7Из хранилища возвращено: ${recoveredItems.join(", ")}§f.`;
        }

        if (hasItemsAfter && hasItemsBefore) {
            message += "\n§cЧасть предметов осталась в хранилище, но ваш инвентарь полон, к сожалению§f.";
        }

        return (giftData || recoveredItems.length > 0) ? this.reply(player, message) : this.error(player, commandName, message);
    }
}

CommandRegistry.getInstance().register(new GiftCommand());