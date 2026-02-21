import { Player } from "@minecraft/server";
import HomeData from "../Interfaces/HomeData";

export default abstract class Command {
    public abstract readonly name: string;
    public abstract readonly commandName: string;
    public abstract readonly description: string;

    protected abstract readonly replyMessage: string;
    public readonly adminRequired: boolean = false;
    public readonly aliases: string[] = [];
    public readonly arguments: string[] = [];

    public abstract execute(data: any): void;

    protected reply(player: Player): void {
        player.sendMessage(`<Войд> ${this.replyMessage}`);
    }

    protected error(player: Player, message: string | null = null): void {
        player.sendMessage(message ? `<Войд> ${message}` : `<Войд> Вы не правильно используете команду! Синтаксис: !${this.commandName}${this.parseArguments()}`);
    }

    protected getAllHomes(player: Player): Record<string, HomeData> {
        const homesRaw: string = player.getDynamicProperty("void:homes") as string;
        return homesRaw ? JSON.parse(homesRaw) : {};
    }

    protected addHome(player: Player, homeName: string): void {
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        homes[homeName] = {
            location: player.location,
            dimension: player.dimension.id
        };
        player.setDynamicProperty("void:homes", JSON.stringify(homes));
    }

    protected deleteHome(player: Player, homeName: string): void {
        const homes: Record<string, HomeData> = this.getAllHomes(player);
        homes[homeName] = {
            location: null,
            dimension: null
        };
        player.setDynamicProperty("void:homes", JSON.stringify(homes));
    }

    public parseArguments(): string {
        let result: string = "";
        for (const arg of this.arguments) {
            result += ` <${arg}>`;
        }
        return result;
    }

    public checkForAdminRequired(player: Player): boolean {
        return !(this.adminRequired && !player.hasTag("admin"));
    }
}