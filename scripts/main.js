import { system, world } from "@minecraft/server";
import { Commands } from "./CommandRegistry";
world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.startsWith("!")) {
        eventData.cancel = true;
        const args = eventData.message.split(" ");
        const command = args[0].substring(1);
        const execute = Commands[command.toLowerCase()];
        if (execute) {
            system.run(() => {
                execute(eventData);
            });
        }
        else {
            eventData.sender.sendMessage("<Войд> Чтобы увидеть список команд, напиши !help");
        }
    }
});
