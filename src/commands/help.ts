import { ChatSendBeforeEvent } from "@minecraft/server";
import { Commands } from "../CommandRegistry";

export default function execute(data: ChatSendBeforeEvent): void {
    let commandList: string = "";
    for (const [name, info] of Object.entries(Commands)) {
        commandList += `\n!${name}: ${info.description}\n`;
    }
    data.sender.sendMessage(`<Войд> Список команд:${commandList}Всего ${Object.keys(Commands).length} команд.`);
}