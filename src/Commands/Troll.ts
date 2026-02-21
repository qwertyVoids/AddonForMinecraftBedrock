import Command from "../Classes/Command";
import { ChatSendBeforeEvent, Player, world } from "@minecraft/server";

export class TrollCommand extends Command {
    public readonly name: string = "Troll";
    public readonly commandName: string = "troll";
    public readonly description: string = "Подкидывает игрока высоко вверх. Требует ник игрока в качестве аргумента (например, !troll Void10100)";
    protected readonly replyMessage: string = "Вы только что запустили игрока в воздух!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["t", "troll"];
    public readonly arguments: string[] = ["ник"];

    public execute(data: ChatSendBeforeEvent): void {
        const input: string = data.message;
        const player: Player = data.sender;
        const startIndex: number = input.indexOf(" ");
        if (startIndex === -1) {
            this.error(player);
            return;
        }
        const name: string = input.substring(startIndex + 1);
        const target: Player = world.getPlayers({name: name})[0];
        if (target) {
            target.addEffect("levitation", 20, {
                amplifier: 50,
                showParticles: false
            });
            this.reply(player);
        } else {
            this.error(player, "Вы не правильно ввели ник игрока!");
        }
    }
}