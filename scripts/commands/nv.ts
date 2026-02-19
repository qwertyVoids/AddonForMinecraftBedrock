import { world, ChatSendBeforeEvent } from "@minecraft/server";

export default function execute(data: ChatSendBeforeEvent) {
    data.sender.addEffect("night_vision", 20000000, {
        amplifier: 255,
        showParticles: false
    });
    data.sender.sendMessage("<Войд> Вы только что активировали ночное зрение!");
}