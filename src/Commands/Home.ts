import { world, Player, ChatSendBeforeEvent, Vector3 } from "@minecraft/server";
import Command from "../Classes/Command";
import { SetHomeCommand } from "./SetHome";
import HomeData from "../Interfaces/HomeData";
import { HomeListCommand } from "./HomeList";

export class HomeCommand extends Command {
    public readonly name: string = "Home";
    public readonly commandName: string = "home";
    public readonly description: string = "Телепортирует в точку дома";
    protected readonly replyMessage: string = "Вы телепортированы в точку дома!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["h", "tph", "tphome", "teleporthome"];
    public readonly arguments: string[] = ["название"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const args: string[] = event.message.split(" ");
        if (args.length < 2) {
            this.error(player, commandName);
            return;
        }

        const homeName: string = args[1].toLowerCase();
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        if (Object.keys(homes).length >= 1) {
            if (!homes[homeName]) {
                this.error(player, commandName, `Такой точки не существует! Проверь все точки через !${new HomeListCommand().commandName}`);
                return;
            }
            const home: HomeData = homes[homeName];
            player.teleport(home.location as Vector3, { dimension: world.getDimension(home.dimension as string) });
            this.reply(player);
        } else {
            const sethomeInstance: SetHomeCommand = new SetHomeCommand();
            this.error(player, commandName, `У вас нету точек дома! Создайте через !${sethomeInstance.commandName}${sethomeInstance.parseArguments()}`);
            return;
        }
    }
}