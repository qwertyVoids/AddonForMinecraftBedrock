import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

class SurvivalCommand extends Command {
    public readonly name: string = "Survival";
    public readonly commandName: string = "survival";
    public readonly description: string = "Активирует режим выживания";
    public readonly replyMessage: string = "Вы перешли в режим выживания!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["s", "gm0"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        player.setGameMode(GameMode.Survival);
        this.reply(player);
    }
}

CommandRegistry.getInstance().register(new SurvivalCommand());