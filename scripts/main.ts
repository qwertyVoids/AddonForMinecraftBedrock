import { system, world, ChatSendBeforeEvent } from "@minecraft/server";
import { Commands } from "./CommandRegistry";

world.beforeEvents.chatSend.subscribe((eventData: ChatSendBeforeEvent) => {
    if (eventData.message.startsWith("!")) {
        eventData.cancel = true;

        const args: string[] = eventData.message.split(" ");
        const command: string = args[0].substring(1);
        const execute: (data: ChatSendBeforeEvent) => void = Commands[command];
        if (execute) {
            system.run(() => {
                execute(eventData);
            });
        } else {
            eventData.sender.sendMessage("<Войд> Чтобы увидеть список команд, напиши !help");
        }
    }
});