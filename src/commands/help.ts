import { ChatSendBeforeEvent } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    data.sender.sendMessage("<Войд> Список команд:\n1. !help\n2. !nv\n3. !troll");
}