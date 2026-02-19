import { ChatSendBeforeEvent } from "@minecraft/server";
import nv from "./commands/nv";
import troll from "./commands/troll";
import trollAll from "./commands/trollAll";
import help from "./commands/help";
import sethome from "./commands/sethome";
import delhome from "./commands/delhome";
import home from "./commands/home";

export const Commands: Record<string, (data: ChatSendBeforeEvent) => void> = {
    nv: nv,
    troll: troll,
    trollall: trollAll,
    help: help,
    sethome: sethome,
    delhome: delhome,
    home: home
}