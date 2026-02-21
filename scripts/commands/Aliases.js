import Command from "../Classes/Command";
import { Commands } from "../CommandRegistry";
export class AliasesCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Aliases";
        this.commandName = "aliases";
        this.description = "Выводит список псевдонимов всех команд, предоставляемых плагином";
        this.replyMessage = "";
        this.aliases = ["alias", "ali", "al"];
        this.adminRequired = false;
    }
    execute(data) {
        let commandList = "";
        for (const [key, instance] of Object.entries(Commands)) {
            if (key === instance.commandName) {
                if (instance.aliases.length >= 1) {
                    let aliases = instance.aliases.map((a) => `!${a}`).join(", ");
                    commandList += `\n\n!${key}: ${aliases};`;
                }
                else {
                    commandList += `\n\n!${key}: Нету;`;
                }
            }
        }
        data.sender.sendMessage(`<Войд> Список псевдонимов команд:${commandList}`);
    }
}
