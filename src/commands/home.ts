import { world, Player, ChatSendBeforeEvent, Dimension } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    const player: Player = data.sender;
    const x: number = player.getDynamicProperty("void:player_x") as number;
    const y: number = player.getDynamicProperty("void:player_y") as number;
    const z: number = player.getDynamicProperty("void:player_z") as number;
    const player_dimension: string = player.getDynamicProperty("void:player_dim") as string;
    if (x !== undefined && y !== undefined && z !== undefined && player_dimension !== undefined) {
        const dimension: Dimension = world.getDimension(player_dimension);
        player.teleport({ x: x, y: y, z: z }, { dimension: dimension });
        player.sendMessage("<Войд> Вы телепортированы в точку дома!");
    } else {
        player.sendMessage("<Войд> Точка дома ещё не установлена!");
    }
}