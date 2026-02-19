export default function execute(data) {
    const player = data.sender;
    player.clearDynamicProperties();
    player.sendMessage("<Войд> Точка дома успешно удалена!");
}
