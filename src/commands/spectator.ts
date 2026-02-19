import { ChatSendBeforeEvent, GameMode, Player } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent): void {
    const player: Player = data.sender;
    player.setGameMode(GameMode.Spectator);
    player.sendMessage("<Войд> Вы перешли в режим наблюдателя!");
}