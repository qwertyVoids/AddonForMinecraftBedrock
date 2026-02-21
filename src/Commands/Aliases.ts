import Command from "../Classes/Command";
import { ChatSendBeforeEvent } from "@minecraft/server";
import { Commands } from "../CommandRegistry";

export class AliasesCommand extends Command {
    public readonly name: string = "Aliases";
    public readonly commandName: string = "aliases";
    public readonly description: string = "Выводит список псевдонимов всех команд, предоставляемых плагином";
    protected readonly replyMessage: string = "";
    public readonly aliases: string[] = ["alias", "ali", "al"];
    public readonly adminRequired: boolean = false;

    public execute(data: ChatSendBeforeEvent): void {
        let commandList: string = "";
        for (const [key, instance] of Object.entries(Commands)) {
            if (key === instance.commandName) {
                if (instance.aliases.length >= 1) {
                    let aliases: string = instance.aliases.map((a: string): string => `!${a}`).join(", ");
                    commandList += `\n\n!${key}: ${aliases};`;
                } else {
                    commandList += `\n\n!${key}: Нету;`;
                }
            }
        }
        data.sender.sendMessage(`<Войд> Список псевдонимов команд:${commandList}`);
    }
}