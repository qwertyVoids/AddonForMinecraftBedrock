import { ChatSendBeforeEvent, Player } from "@minecraft/server";

export default abstract class Command {
    public abstract readonly name: string;
    public abstract readonly commandName: string;
    public abstract readonly description: string;
    public abstract readonly adminRequired: boolean;

    public readonly replyMessage: string = "";
    public readonly aliases: string[] = [];
    public readonly arguments: string[] = [];

    public abstract execute(event: ChatSendBeforeEvent, commandName: string): void;

    protected reply(player: Player, message?: string): void {
        if (message) {
            player.sendMessage(`<Войд> ${message.replace(/\n/g, "\n<Войд> ")}`);
        } else {
            if (this.replyMessage) {
                player.sendMessage(`<Войд> ${this.replyMessage}`);
            } else {
                player.sendMessage("Ошибка: Не удалось инициализировать replyMessage!");
            }
        }
    }

    protected error(player: Player, commandName: string, message?: string): void {
        player.sendMessage(message ? `<Войд> ${message.replace(/\n/g, "\n<Войд> ")}` : `<Войд> Вы не правильно используете команду! Синтаксис: !${commandName}${this.parseArguments()}`);
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