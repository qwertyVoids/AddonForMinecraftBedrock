import nv from "./commands/nv";
import troll from "./commands/troll";
import trollAll from "./commands/trollAll";
import help from "./commands/help";
import sethome from "./commands/sethome";
import delhome from "./commands/delhome";
import home from "./commands/home";
import creative from "./commands/creative";
import survival from "./commands/survival";
import spectator from "./commands/spectator";
export const Commands = {
    nv: { description: "Активирует ночное зрение;", execute: nv },
    troll: { description: "Подкидывает игрока высоко вверх. Требует ник игрока в качестве аргумента (например, !troll Void10100);", execute: troll },
    trollall: { description: "Подкидывает всех игроков высоко вверх, кроме вас самого;", execute: trollAll },
    help: { description: "Выводит список всех команд, что добавляет плагин;", execute: help },
    sethome: { description: "Устанавливает точку дома;", execute: sethome },
    delhome: { description: "Удаляет точку дома;", execute: delhome },
    home: { description: "Телепортирует в точку дома;", execute: home },
    c: { description: "Активирует режим креатива;", execute: creative },
    s: { description: "Активирует режим выживания;", execute: survival },
    sp: { description: "Активирует режим наблюдателя;", execute: spectator }
};
