import { Commands } from "../CommandRegistry";
export default function execute(data) {
    let commandList = "";
    for (const [name, info] of Object.entries(Commands)) {
        commandList += `\n!${name}: ${info.description}\n`;
    }
    data.sender.sendMessage(`<Войд> Список команд:${commandList}Всего ${Object.keys(Commands).length} команд.`);
}
