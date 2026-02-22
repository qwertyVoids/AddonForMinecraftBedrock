import Command from "../Classes/Command";
import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

export class SurvivalCommand extends Command {
    public readonly name: string = "Survival";
    public readonly commandName: string = "survival";
    public readonly description: string = "Активирует режим выживания";
    protected readonly replyMessage: string = "Вы перешли в режим выживания!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["s", "gm0"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        player.setGameMode(GameMode.Survival);
        this.reply(player);
    }
}