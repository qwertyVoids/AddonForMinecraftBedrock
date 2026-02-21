import Command from "../Classes/Command";
import { GameMode } from "@minecraft/server";
export class CreativeCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Creative";
        this.commandName = "creative";
        this.description = "Активирует режим креатива";
        this.replyMessage = "Вы перешли в режим креатива!";
        this.adminRequired = true;
        this.aliases = ["c", "gm1"];
    }
    execute(data) {
        const player = data.sender;
        player.setGameMode(GameMode.Creative);
        this.reply(player);
    }
}
