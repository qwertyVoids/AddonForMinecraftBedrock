import * as server from "@minecraft/server";
import { ChatSendBeforeEvent, PlayerSpawnAfterEvent } from "@minecraft/server";
import { Commands } from "./CommandRegistry";
import Command from "./Classes/Command";

server.world.beforeEvents.chatSend.subscribe((eventData: ChatSendBeforeEvent): void => {
    if (eventData.message.startsWith("!")) {
        eventData.cancel = true;

        const args: string[] = eventData.message.split(" ");
        const commandName: string = args[0].substring(1);
        const commandData: Command = Commands[commandName.toLowerCase()];
        if (commandData && commandData.execute) {
            server.system.run((): void => {
                commandData.execute(eventData, commandName);
            });
        } else {
            eventData.sender.sendMessage("<Войд> Чтобы увидеть список команд, напиши !help");
        }
    }
});

server.world.afterEvents.playerSpawn.subscribe(({player, initialSpawn}: PlayerSpawnAfterEvent): void => {
    if (initialSpawn) {
        server.system.runTimeout((): void => {
            player.sendMessage("<Войд> Привет! Я Войд, создатель плагина. Я буду помогать тебе, давая отчёты о результатах использования команд. Напиши !help, чтобы увидеть список всех команд. Кстати, команды, предоставляемые моим плагином, всегда начинаются с восклицательного знака.");
            player.playSound("note.pling");
        }, 50);
    }
});