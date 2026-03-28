import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import LocalizedDimension from "../Types/LocalizedDimension";

class GetPositionCommand extends Command {
    public readonly name: string = "Get Position";
    public readonly commandName: string = "getposition";
    public readonly description: string = "Выводит ваши точные координаты";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["getpos", "pos", "mypos", "position", "getp", "gpos", "geo", "locate", "gp"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const dimensions: Record<string, LocalizedDimension> = {
            "minecraft:overworld": "в обычном мире",
            "minecraft:nether": "в аду",
            "minecraft:the_end": "в краю"
        }
        const dimension: LocalizedDimension = dimensions[player.dimension.id] ?? "в неизвестном мире";
        player.sendMessage(`<Войд> Ваши координаты: ${Object.values(player.location).map((coord: number): number => Math.floor(coord)).join(", ")} ${dimension}.`);
    }
}

CommandRegistry.getInstance().register(new GetPositionCommand());