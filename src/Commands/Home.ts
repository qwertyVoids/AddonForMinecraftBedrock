import { ChatSendBeforeEvent, Player, Vector3, world } from "@minecraft/server";
import Command from "../Classes/Command";
import CommandRegistry from "../Registries/CommandRegistry";
import HomeData from "../Interfaces/HomeData";
import DataManager from "../Managers/DataManager";
import PropertyKeys from "../Enumerations/PropertyKeys";

class HomeCommand extends Command {
    public readonly name: string = "Home";
    public readonly commandName: string = "home";
    public readonly description: string = "Телепортирует вас в точку дома";
    public readonly replyMessage: string = "Вы телепортированы в точку дома!";
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = ["h", "tph", "tphome", "teleporthome"];
    public readonly arguments: string[] = ["название"];

    public execute(event: ChatSendBeforeEvent, commandName: string): void {
        const player: Player = event.sender;
        const args: string[] = event.message.split(" ");
        if (args.length < 2) {
            return this.error(player, commandName);
        }

        const homeName: string = args[1].toLowerCase();
        const homes: Record<string, HomeData> = DataManager.getJSONData(player, PropertyKeys.Homes);
        if (Object.keys(homes).length >= 1) {
            if (!homes[homeName]) {
                return this.error(player, commandName, `Такой точки не существует! Проверь все точки через !${CommandRegistry.getInstance().getCommand("homelist")?.commandName}.`);
            }

            const home: HomeData = homes[homeName];
            player.teleport(home.location as Vector3, { dimension: world.getDimension(home.dimension as string) });
            this.reply(player);
        } else {
            return this.error(player, commandName, `У вас нету точек дома! Создайте через !${CommandRegistry.getInstance().getCommand("sethome")?.commandName}${CommandRegistry.getInstance().getCommand("sethome")?.parseArguments()}.`);
        }
    }
}

CommandRegistry.getInstance().register(new HomeCommand());