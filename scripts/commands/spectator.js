import { GameMode } from "@minecraft/server";
export default function execute(data) {
    const player = data.sender;
    player.setGameMode(GameMode.Spectator);
    player.sendMessage("<Войд> Вы перешли в режим наблюдателя!");
}
