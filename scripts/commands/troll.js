import { world } from "@minecraft/server";
export default function execute(data) {
    const args = data.message.split(" ");
    if (args.length < 2) {
        data.sender.sendMessage("<Войд> Вы не правильно используете команду! Синтаксис: !troll <ник>");
    }
    else {
        const player = world.getPlayers({ name: args[1] })[0];
        if (player) {
            player.addEffect("levitation", 20, {
                amplifier: 50,
                showParticles: false
            });
            data.sender.sendMessage("<Войд> Вы только что запустили игрока в воздух!");
        }
        else {
            data.sender.sendMessage("<Войд> Вы не правильно ввели ник игрока!");
        }
    }
}
