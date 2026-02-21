import Command from "../Classes/Command";
import { SetHomeCommand } from "./SetHome";
export class DeleteHomeCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = "Delete Home";
        this.commandName = "deletehome";
        this.description = "Удаляет точку дома";
        this.replyMessage = "Точка дома успешно удалена!";
        this.adminRequired = false;
        this.aliases = ["delhome", "dhome", "deleteh"];
        this.arguments = ["название"];
    }
    execute(data) {
        const player = data.sender;
        const args = data.message.split(" ");
        if (args.length < 2) {
            this.error(player);
        }
        const homeName = args[1].toLowerCase();
        const homes = this.getAllHomes(player);
        if (Object.entries(homes).length >= 1) {
            if (!homes[homeName]) {
                this.error(player, "Такой точки не существует!");
            }
            else {
                this.deleteHome(player, homeName);
                this.reply(player);
            }
        }
        else {
            const sethomeInstance = new SetHomeCommand();
            this.error(player, `У вас нету точек дома! Создайте через !${sethomeInstance.commandName}${sethomeInstance.parseArguments()}.`);
        }
    }
}
