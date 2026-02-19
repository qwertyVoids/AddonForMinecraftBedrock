import { Player, ChatSendBeforeEvent } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    const player: Player = data.sender;
    player.setDynamicProperty("void:player_x", undefined);
    player.setDynamicProperty("void:player_y", undefined);
    player.setDynamicProperty("void:player_z", undefined);
    player.setDynamicProperty("void:player_dim", undefined);
    player.sendMessage("<Войд> Точка дома успешно удалена!");
}