import { Player, ChatSendBeforeEvent } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    const player: Player = data.sender;
    const x: number = player.location.x;
    const y: number = player.location.y;
    const z: number = player.location.z;
    player.setDynamicProperties({
        "void:player_x": x,
        "void:player_y": y,
        "void:player_z": z
    });
    player.sendMessage("<Войд> Точка дома успешно поставлена!");
}