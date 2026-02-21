import Command from "../Classes/Command";
export class SetHomeCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Set Home";
        this.commandName = "sethome";
        this.description = "Устанавливает точку дома";
        this.replyMessage = "Точка дома успешно установлена!";
        this.adminRequired = false;
        this.aliases = ["sh", "seth", "shome"];
        this.arguments = ["название"];
    }
    execute(data) {
        const player = data.sender;
        const args = data.message.split(" ");
        if (args.length < 2) {
            this.error(player);
        }
        const homeName = args[1].toLowerCase();
        this.addHome(player, homeName);
        this.reply(player);
    }
}
