import Command from "../Classes/Command";
import { GameMode } from "@minecraft/server";
export class SurvivalCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Survival";
        this.commandName = "survival";
        this.description = "Активирует режим выживания";
        this.replyMessage = "Вы перешли в режим выживания!";
        this.adminRequired = false;
        this.aliases = ["s", "gm2", "gm0"];
    }
    execute(data) {
        const player = data.sender;
        player.setGameMode(GameMode.Survival);
        this.reply(player);
    }
}
