import Command from "../Classes/Command";
import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

export class SpectatorCommand extends Command {
    public readonly name: string = "Spectator";
    public readonly commandName: string = "spectator";
    public readonly description: string = "Активирует режим наблюдателя";
    protected readonly replyMessage: string = "Вы перешли в режим наблюдателя!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["sp", "gm3"];

    public execute(data: ChatSendBeforeEvent): void {
        const player: Player = data.sender;
        player.setGameMode(GameMode.Spectator);
        this.reply(player);
    }
}