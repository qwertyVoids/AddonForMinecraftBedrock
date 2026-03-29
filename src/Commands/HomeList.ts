import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import HomeData from "../Interfaces/HomeData";
import DataManager from "../Managers/DataManager";
import PropertyKeys from "../Enumerations/PropertyKeys";

class HomeListCommand extends Command {
    public readonly name: string = "Home List";
    public readonly commandName: string = "homelist";
    public readonly description: string = "Выводит все точки дома";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["hms", "homes", "hl", "hlist", "homel"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const homes: Record<string, HomeData> = DataManager.getJSONData(player, PropertyKeys.Homes);
        const homeList: string = Object.keys(homes).join(", ");
        if (Object.keys(homeList).length >= 1) {
            player.sendMessage(`<Войд> Список точек домов:\n${homeList}\nВсего точек: ${Object.keys(homes).length}.`);
        } else {
            return this.error(player, commandName, `У вас нету точек дома! Создайте через !${CommandRegistry.getInstance().getCommand("sethome")?.commandName}${CommandRegistry.getInstance().getCommand("sethome")?.parseArguments()}.`);
        }
    }
}

CommandRegistry.getInstance().register(new HomeListCommand());