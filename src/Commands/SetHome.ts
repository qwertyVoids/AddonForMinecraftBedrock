import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import DataManager from "../Managers/DataManager";
import HomeData from "../Interfaces/HomeData";
import PropertyKeys from "../Enumerations/PropertyKeys";

class SetHomeCommand extends Command {
    public readonly name: string = "Set Home";
    public readonly commandName: string = "sethome";
    public readonly description: string = "Устанавливает точку дома";
    public readonly replyMessage: string = "Точка дома успешно установлена!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["sh", "seth", "shome"];
    public readonly arguments: string[] = ["название"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const args: string[] = event.message.split(" ");
        if (args.length < 2) {
            return this.error(player, commandName);
        }

        const homeName: string = args[1].toLowerCase();
        DataManager.updateJSONData<Record<string, HomeData>>(player, PropertyKeys.Homes, (homes: Record<string, HomeData>): Record<string, HomeData> => {
            homes[homeName] = {
                location: player.location,
                dimension: player.dimension.id
            };
            return homes;
        });
        this.reply(player);
    }
}

CommandRegistry.getInstance().register(new SetHomeCommand());