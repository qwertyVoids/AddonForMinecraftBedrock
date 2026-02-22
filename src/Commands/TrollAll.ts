import Command from "../Classes/Command";
import { ChatSendBeforeEvent, Player, world } from "@minecraft/server";

export class TrollAllCommand extends Command {
    public readonly name: string = "Troll All";
    public readonly commandName: string = "trollall";
    public readonly description: string = "Подкидывает всех игроков высоко вверх, кроме вас самого";
    protected readonly replyMessage: string = "Вы только что запустили всех игроков в воздух!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["ta", "trall"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const players: Player[] = world.getAllPlayers();
        for (const player of players) {
            if (player.name !== event.sender.name) {
                player.addEffect("levitation", 20, {
                    amplifier: 50,
                    showParticles: false
                });
            }
        }
        this.reply(event.sender);
    }
}