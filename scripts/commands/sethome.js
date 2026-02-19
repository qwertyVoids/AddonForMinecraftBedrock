export default function execute(data) {
    const player = data.sender;
    const x = player.location.x;
    const y = player.location.y;
    const z = player.location.z;
    const dimension = player.dimension.id;
    player.setDynamicProperties({
        "void:player_x": x,
        "void:player_y": y,
        "void:player_z": z,
        "void:player_dim": dimension
    });
    player.sendMessage("<Войд> Точка дома успешно поставлена!");
}
