import { system, world } from "@minecraft/server";
import { Commands } from "./CommandRegistry";
world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.startsWith("!")) {
        eventData.cancel = true;
        const args = eventData.message.split(" ");
        const commandName = args[0].substring(1);
        const commandData = Commands[commandName.toLowerCase()];
        if (commandData && commandData.execute) {
            system.run(() => {
                const execute = commandData.execute;
                execute(eventData);
            });
        }
        else {
            eventData.sender.sendMessage("<Войд> Чтобы увидеть список команд, напиши !help");
        }
    }
});
