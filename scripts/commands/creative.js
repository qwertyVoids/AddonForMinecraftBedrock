import { GameMode } from "@minecraft/server";
export default function execute(data) {
    const player = data.sender;
    player.setGameMode(GameMode.Creative);
    player.sendMessage("<Войд> Вы перешли в режим креатива!");
}
