import Command from "../Classes/Command";
export class NightVisionCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Night Vision";
        this.commandName = "nightvision";
        this.description = "Активирует ночное зрение";
        this.replyMessage = "Вы только что активировали ночное зрение!";
        this.adminRequired = true;
        this.aliases = ["nv", "vision"];
    }
    execute(data) {
        const player = data.sender;
        player.addEffect("night_vision", 20000000, {
            amplifier: 1,
            showParticles: false
        });
        this.reply(player);
    }
}
