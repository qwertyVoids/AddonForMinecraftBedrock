import { ChatSendBeforeEvent } from "@minecraft/server";

export default interface CommandInformation {
    description: string;
    execute: (data: ChatSendBeforeEvent) => void;
}