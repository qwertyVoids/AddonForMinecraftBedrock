import { Player, ChatSendBeforeEvent } from "@minecraft/server";
import Command from "../Classes/Command";
import HomeData from "../Interfaces/HomeData";
import { SetHomeCommand } from "./SetHome";

export class HomeListCommand extends Command {
    public readonly name: string = "Home List";
    public readonly commandName: string = "homelist";
    public readonly description: string = "Выводит все точки дома";
    protected readonly replyMessage: string = "";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["hms", "homes", "hl", "hlist", "homel"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        const homeList: string = Object.keys(homes).join(", ");
        if (Object.keys(homeList).length >= 1) {
            player.sendMessage(`<Войд> Список точек домов:\n${homeList}\nВсего точек: ${Object.keys(homes).length}.`);
        } else {
            const sethomeInstance: SetHomeCommand = new SetHomeCommand();
            this.error(player, commandName, `У вас нету точек дома! Создайте через !${sethomeInstance.commandName}${sethomeInstance.parseArguments()}`);
            return;
        }
    }
}