import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import { ChatSendBeforeEvent, Player } from "@minecraft/server";

class AliasesCommand extends Command {
    public readonly name: string = "Aliases";
    public readonly commandName: string = "aliases";
    public readonly description: string = "Выводит список псевдонимов всех команд, предоставляемых плагином";
    public readonly aliases: string[] = ["alias", "ali", "al"];
    public readonly adminRequired: boolean = false;

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const aliasesList: string = CommandRegistry.getInstance().getCache("aliases_text");
        if (!aliasesList) {
            return this.error(player, commandName, "Команды не найдены. Похоже, проблема с инициализацией. Пожалуйста, перезайдите!");
        }
        player.sendMessage(`<Войд> Список псевдонимов команд:${aliasesList}\nВсего псевдонимов: ${CommandRegistry.getInstance().getAliasCount()}.\nПопробуйте !${CommandRegistry.getInstance().getCommand("help")?.commandName}, чтобы увидеть список всех описаний команд!`);
    }
}

CommandRegistry.getInstance().register(new AliasesCommand());