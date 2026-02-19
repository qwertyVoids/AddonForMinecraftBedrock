import { world } from "@minecraft/server";
export default function execute(data) {
    const player = data.sender;
    const x = player.getDynamicProperty("void:player_x");
    const y = player.getDynamicProperty("void:player_y");
    const z = player.getDynamicProperty("void:player_z");
    const player_dimension = player.getDynamicProperty("void:player_dim");
    if (x !== undefined && y !== undefined && z !== undefined && player_dimension !== undefined) {
        const dimension = world.getDimension(player_dimension);
        player.teleport({ x: x, y: y, z: z }, { dimension: dimension });
        player.sendMessage("<Войд> Вы телепортированы в точку дома!");
    }
    else {
        player.sendMessage("<Войд> Точка дома ещё не установлена!");
    }
}
