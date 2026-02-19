import { ChatSendBeforeEvent } from "@minecraft/server";
import nv from "./commands/nv";
import troll from "./commands/troll";
import help from "./commands/help";

export const Commands: Record<string, (data: ChatSendBeforeEvent) => void> = {
    nv: nv,
    troll: troll,
    help: help
}