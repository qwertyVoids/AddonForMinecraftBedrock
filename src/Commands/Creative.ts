import Command from "../Classes/Command";
import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

export class CreativeCommand extends Command {
    public readonly name: string = "Creative";
    public readonly commandName: string = "creative";
    public readonly description: string = "Активирует режим креатива";
    protected readonly replyMessage: string = "Вы перешли в режим креатива!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["c", "gm1"];

    public execute(data: ChatSendBeforeEvent): void {
        const player: Player = data.sender;
        player.setGameMode(GameMode.Creative);
        this.reply(player);
    }
}