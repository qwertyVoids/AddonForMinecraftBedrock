import { world } from "@minecraft/server";
export default function execute(data) {
    const players = world.getAllPlayers();
    for (const player of players) {
        if (player.name !== data.sender.name) {
            player.addEffect("levitation", 20, {
                amplifier: 50,
                showParticles: false
            });
        }
    }
    data.sender.sendMessage("<Войд> Вы только что запустили всех игроков в воздух!");
}
