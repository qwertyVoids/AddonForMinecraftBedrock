import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

class CreativeCommand extends Command {
    public readonly name: string = "Creative";
    public readonly commandName: string = "creative";
    public readonly description: string = "Активирует режим креатива";
    public readonly replyMessage: string = "Вы перешли в режим креатива!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["c", "gm1"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        player.setGameMode(GameMode.Creative);
        this.reply(player);
    }
}

CommandRegistry.getInstance().register(new CreativeCommand());