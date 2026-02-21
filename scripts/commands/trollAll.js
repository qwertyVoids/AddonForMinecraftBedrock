import Command from "../Classes/Command";
import { world } from "@minecraft/server";
export class TrollAllCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Troll All";
        this.commandName = "trollall";
        this.description = "Подкидывает всех игроков высоко вверх, кроме вас самого";
        this.replyMessage = "Вы только что запустили всех игроков в воздух!";
        this.adminRequired = true;
        this.aliases = ["ta", "trall"];
    }
    execute(data) {
        const players = world.getAllPlayers();
        for (const player of players) {
            if (player.name !== data.sender.name) {
                player.addEffect("levitation", 20, {
                    amplifier: 50,
                    showParticles: false
                });
            }
        }
        this.reply(data.sender);
    }
}
