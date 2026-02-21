import { Player, ChatSendBeforeEvent } from "@minecraft/server";
import Command from "../Classes/Command";

export class SetHomeCommand extends Command {
    public readonly name: string = "Set Home";
    public readonly commandName: string = "sethome";
    public readonly description: string = "Устанавливает точку дома";
    protected readonly replyMessage: string = "Точка дома успешно установлена!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["sh", "seth", "shome"];
    public readonly arguments: string[] = ["название"];

    public execute(data: ChatSendBeforeEvent): void {
        const player: Player = data.sender;
        const args: string[] = data.message.split(" ");
        if (args.length < 2) { this.error(player); }

        const homeName: string = args[1].toLowerCase();
        this.addHome(player, homeName);
        this.reply(player);
    }
}