import * as server from "@minecraft/server";
import { ChatSendBeforeEvent, PlayerSpawnAfterEvent } from "@minecraft/server";
import CommandRegistry from "./Registries/CommandRegistry";
import Command from "./Classes/Command";
import StringUtils from "./Utils/StringUtils";

CommandRegistry.getInstance().loadCommands();

server.world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent): void => {
    if (event.message.startsWith("!")) {
        event.cancel = true;

        const args: string[] = event.message.split(" ");
        const commandName: string = args[0].substring(1).toLowerCase();
        const command: Command = CommandRegistry.getInstance().getCommand(commandName) as Command;
        if (command) {
            server.system.run((): void => {
                command.execute(event, commandName);
            });
        } else {
            event.sender.sendMessage("<Войд> Нет такой команды. Чтобы увидеть список команд, напиши !help.");
        }
    }
});

server.world.afterEvents.playerSpawn.subscribe(({player, initialSpawn}: PlayerSpawnAfterEvent): void => {
    if (initialSpawn) {
        server.system.runTimeout((): void => {
            let commandCount: number = CommandRegistry.getInstance().getCommandCount();
            player.sendMessage(`<Войд> Привет! Я Войд, создатель плагина. Буду помогать тебе и присылать отчёты о работе команд. Напиши !help, чтобы увидеть весь список. Кстати, все мои команды начинаются с восклицательного знака. На данный момент в плагине уже ${commandCount} ${StringUtils.getPlural(commandCount, "команда", "команды", "команд")}!`);
            player.playSound("note.pling");
        }, 100);
    }
});