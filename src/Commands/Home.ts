import { world, Player, ChatSendBeforeEvent, Vector3 } from "@minecraft/server";
import Command from "../Classes/Command";
import { SetHomeCommand } from "./SetHome";
import HomeData from "../Interfaces/HomeData";

export class HomeCommand extends Command {
    public readonly name: string = "Home";
    public readonly commandName: string = "home";
    public readonly description: string = "Телепортирует в точку дома";
    protected readonly replyMessage: string = "Вы телепортированы в точку дома!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["h", "tph", "tphome", "teleporthome"];
    public readonly arguments: string[] = ["название"];

    public execute(data: ChatSendBeforeEvent): void {
        const player: Player = data.sender;
        const args: string[] = data.message.split(" ");
        if (args.length < 2) { this.error(player); }

        const homeName: string = args[1].toLowerCase();
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        if (Object.entries(homes).length >= 1) {
            if (!homes[homeName]) {
                this.error(player, "Такой точки не существует!");
            } else {
                const home: HomeData = homes[homeName];
                player.teleport(home.location as Vector3, { dimension: world.getDimension(home.dimension as string) });
                this.reply(player);
            }
        } else {
            const sethomeInstance: SetHomeCommand = new SetHomeCommand();
            this.error(player, `У вас нету точек дома! Создайте через !${sethomeInstance.commandName}${sethomeInstance.parseArguments()}.`);
        }
    }
}