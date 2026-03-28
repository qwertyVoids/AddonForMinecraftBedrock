import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import HomeData from "../Interfaces/HomeData";
import DataManager from "../Managers/DataManager";
import PropertyKeys from "../Enumerations/PropertyKeys";

class DeleteHomeCommand extends Command {
    public readonly name: string = "Delete Home";
    public readonly commandName: string = "deletehome";
    public readonly description: string = "Удаляет точку дома";
    public readonly replyMessage: string = "Точка дома успешно удалена!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["dh", "delhome", "dhome", "deleteh"];
    public readonly arguments: string[] = ["название"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const args: string[] = event.message.split(" ");
        if (args.length < 2) {
            this.error(player, commandName);
            return;
        }

        const homeName: string = args[1].toLowerCase();
        const homes: Record<string, HomeData> = DataManager.getJSONData(player, PropertyKeys.Homes);
        if (Object.entries(homes).length >= 1) {
            if (!homes[homeName]) {
                this.error(player, commandName, `Такой точки не существует! Проверь все точки через !${CommandRegistry.getInstance().getCommand("homelist")?.commandName}`);
                return;
            } else {
                DataManager.updateJSONData<Record<string, HomeData>>(player, PropertyKeys.Homes, (homes: Record<string, HomeData>): Record<string, HomeData> => {
                    delete homes[homeName];
                    return homes;
                });
                this.reply(player);
            }
        } else {
            this.error(player, commandName, `У вас нету точек дома! Создайте через !${CommandRegistry.getInstance().getCommand("sethome")?.commandName}${CommandRegistry.getInstance().getCommand("sethome")?.parseArguments()}`);
            return;
        }
    }
}

CommandRegistry.getInstance().register(new DeleteHomeCommand());