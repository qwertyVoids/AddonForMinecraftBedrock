import Command from "../Classes/Command";
import { ChatSendBeforeEvent } from "@minecraft/server";
import { Commands } from "../CommandRegistry";
import { AliasesCommand } from "./Aliases";

export class HelpCommand extends Command {
    public readonly name: string = "Help";
    public readonly commandName: string = "help";
    public readonly description: string = "Выводит все команды, предоставляемые плагином";
    protected readonly replyMessage: string = "";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["sos", "commands", "command", "cmds", "cmd"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        let commandList: string = "";
        let commandCount: number = 0;
        for (const [key, instance] of Object.entries(Commands)) {
            if (key === instance.commandName) {
                commandList += `\n\n!${key}: ${instance.description};`;
                commandCount++;
            }
        }
        event.sender.sendMessage(`<Войд> Список команд:${commandList}\nВсего команд: ${commandCount}.\nПопробуйте !${new AliasesCommand().commandName}, чтобы увидеть список всех псевдонимов!`);
    }
}