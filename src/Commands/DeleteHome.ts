import { Player, ChatSendBeforeEvent } from "@minecraft/server";
import Command from "../Classes/Command";
import HomeData from "../Interfaces/HomeData";
import { SetHomeCommand } from "./SetHome";

export class DeleteHomeCommand extends Command {
    public readonly name: string = "Delete Home";
    public readonly commandName: string = "deletehome";
    public readonly description: string = "Удаляет точку дома";
    protected readonly replyMessage: string = "Точка дома успешно удалена!";
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
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        if (Object.entries(homes).length >= 1) {
            if (!homes[homeName]) {
                this.error(player, commandName, "Такой точки не существует!");
                return;
            } else {
                this.deleteHome(player, homeName);
                this.reply(player);
            }
        } else {
            const sethomeInstance: SetHomeCommand = new SetHomeCommand();
            this.error(player, commandName, `У вас нету точек дома! Создайте через !${sethomeInstance.commandName}${sethomeInstance.parseArguments()}`);
            return;
        }
    }
}