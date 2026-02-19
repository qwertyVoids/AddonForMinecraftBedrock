export default function execute(data) {
    const player = data.sender;
    const x = player.location.x;
    const y = player.location.y;
    const z = player.location.z;
    player.setDynamicProperties({
        "void:player_x": x,
        "void:player_y": y,
        "void:player_z": z
    });
    player.sendMessage("<Войд> Точка дома успешно поставлена!");
}
