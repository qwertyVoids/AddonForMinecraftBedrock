import { system, world, ChatSendBeforeEvent } from "@minecraft/server";
import { Commands } from "./CommandRegistry";
import CommandInformation from "./interfaces/CommandInformation";

world.beforeEvents.chatSend.subscribe((eventData: ChatSendBeforeEvent): void => {
    if (eventData.message.startsWith("!")) {
        eventData.cancel = true;

        const args: string[] = eventData.message.split(" ");
        const commandName: string = args[0].substring(1);
        const commandData: CommandInformation = Commands[commandName.toLowerCase()];
        if (commandData && commandData.execute) {
            system.run((): void => {
                const execute: (data: ChatSendBeforeEvent) => void = commandData.execute;
                execute(eventData);
            });
        } else {
            eventData.sender.sendMessage("<Войд> Чтобы увидеть список команд, напиши !help");
        }
    }
});