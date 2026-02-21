import Command from "../Classes/Command";
import { GameMode } from "@minecraft/server";
export class SpectatorCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Spectator";
        this.commandName = "spectator";
        this.description = "Активирует режим наблюдателя";
        this.replyMessage = "Вы перешли в режим наблюдателя!";
        this.adminRequired = true;
        this.aliases = ["sp", "gm3"];
    }
    execute(data) {
        const player = data.sender;
        player.setGameMode(GameMode.Spectator);
        this.reply(player);
    }
}
