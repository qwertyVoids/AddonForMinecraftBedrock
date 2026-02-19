export default function execute(data) {
    const player = data.sender;
    const x = player.getDynamicProperty("void:player_x");
    const y = player.getDynamicProperty("void:player_y");
    const z = player.getDynamicProperty("void:player_z");
    if (x !== undefined && y !== undefined && z !== undefined) {
        player.teleport({ x: x, y: y, z: z });
        player.sendMessage("<Войд> Вы телепортированы в точку дома!");
    }
    else {
        player.sendMessage("<Войд> Точка дома ещё не установлена!");
    }
}
