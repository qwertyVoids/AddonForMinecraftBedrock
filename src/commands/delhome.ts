import { Player, ChatSendBeforeEvent } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    const player: Player = data.sender;
    player.clearDynamicProperties();
    player.sendMessage("<Войд> Точка дома успешно удалена!");
}