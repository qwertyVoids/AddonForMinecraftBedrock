import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import { ChatSendBeforeEvent, Player } from "@minecraft/server";

class HelpCommand extends Command {
    public readonly name: string = "Help";
    public readonly commandName: string = "help";
    public readonly description: string = "Выводит все команды, предоставляемые плагином";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["sos", "commands", "command", "cmds", "cmd"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const commandList: string = CommandRegistry.getInstance().getCache("help_text");
        if (!commandList) {
            return this.error(player, commandName, "Команды не найдены. Похоже, проблема с инициализацией. Пожалуйста, перезайдите!");
        }
        player.sendMessage(`<Войд> Список команд:${commandList}\nВсего команд: ${CommandRegistry.getInstance().getCommandCount()}.\nПопробуйте !${CommandRegistry.getInstance().getCommand("aliases")?.commandName}, чтобы увидеть список всех псевдонимов!`);
    }
}

CommandRegistry.getInstance().register(new HelpCommand());