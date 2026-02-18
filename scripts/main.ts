import { system, world } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.charAt(0) === "!") {
        eventData.cancel = true;

        if (eventData.message === "!nv") {
            eventData.sender.runCommandAsync("effect @s night_vision 1000000 255 true");
            eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы только что активировали ночное зрение!"}]}');
        } else if (eventData.message.split(" ")[0] === "!troll") {
            const inputTokens = eventData.message.split(" ");

            if (inputTokens.length === 2) {
                if (getPlayer(inputTokens[1]) !== null) {
                    eventData.sender.runCommandAsync("effect " + inputTokens[1] + " levitation 1 50 true");
                    eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы только что запустили игрока в воздух!"}]}');
                } else {
                    eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы не правильно ввели ник игрока!"}]}');
                }
            } else {
                eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы не правильно используете команду! Синтаксис: !troll <ник>"}]}');
            }
        } else if (eventData.message.split(" ")[0] === "!help") {
            eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Список команд:\n1. !help\n2. !nv\n3. !troll\n4. !system"}]}');
        } else if (eventData.message.split(" ")[0] === "!system") {
            if (eventData.message.length >= 8) {
                if (eventData.message.trim().length > 7) {
                    eventData.sender.runCommandAsync('tellraw @a {"rawtext": [{"text":"§c§l[system] "},{"text":"§r§f' + eventData.message.slice(8) + '"}]}');
                } else {
                    eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы отправили пустое сообщение!"}]}');
                }
            } else {
                eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Вы не правильно используете команду! Синтаксис: !system <текст>"}]}');
            }
        } else {
            eventData.sender.runCommandAsync('tellraw @s {"rawtext": [{"text":"<Великий> Чтобы увидеть список команд, напиши !help"}]}');
        }
    }
});

function getPlayer(name) {
    const players = world.getPlayers();

    for (let i = 0; i < players.length; i++) {
        if (players[i].name === name) {
            return players[i];
        }
    }

    return null;
}