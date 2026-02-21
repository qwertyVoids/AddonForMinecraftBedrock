import Command from "../Classes/Command";
import { world } from "@minecraft/server";
export class TrollCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Troll";
        this.commandName = "troll";
        this.description = "Подкидывает игрока высоко вверх. Требует ник игрока в качестве аргумента (например, !troll Void10100)";
        this.replyMessage = "Вы только что запустили игрока в воздух!";
        this.adminRequired = true;
        this.aliases = ["t", "troll"];
        this.arguments = ["ник"];
    }
    execute(data) {
        const input = data.message;
        const player = data.sender;
        const startIndex = input.indexOf(" ");
        if (startIndex === -1) {
            this.error(player);
            return;
        }
        const name = input.substring(startIndex + 1);
        const target = world.getPlayers({ name: name })[0];
        if (target) {
            target.addEffect("levitation", 20, {
                amplifier: 50,
                showParticles: false
            });
            this.reply(player);
        }
        else {
            this.error(player, "Вы не правильно ввели ник игрока!");
        }
    }
}
