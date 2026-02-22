import * as server from "@minecraft/server";
import { Commands } from "./CommandRegistry";
import Command from "./Classes/Command";

server.world.beforeEvents.chatSend.subscribe((eventData: server.ChatSendBeforeEvent): void => {
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