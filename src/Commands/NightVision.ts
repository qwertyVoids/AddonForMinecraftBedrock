import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import { ChatSendBeforeEvent, Player } from "@minecraft/server";

class NightVisionCommand extends Command {
    public readonly name: string = "Night Vision";
    public readonly commandName: string = "nightvision";
    public readonly description: string = "Активирует ночное зрение";
    public readonly replyMessage: string = "Вы только что активировали ночное зрение!";
    public readonly adminRequired: boolean = true;
    public readonly aliases: string[] = ["nv", "vision"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        player.addEffect("night_vision", 20000000, {
            amplifier: 255,
            showParticles: false
        });
        this.reply(player);
    }
}

CommandRegistry.getInstance().register(new NightVisionCommand());