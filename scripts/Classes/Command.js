export default class Command {
    constructor() {
        this.adminRequired = false;
        this.aliases = [];
        this.arguments = [];
    }
    reply(player) {
        player.sendMessage(`<Войд> ${this.replyMessage}`);
    }
    error(player, message = null) {
        player.sendMessage(message ? `<Войд> ${message}` : `<Войд> Вы не правильно используете команду! Синтаксис: !${this.commandName}${this.parseArguments()}`);
    }
    getAllHomes(player) {
        const homesRaw = player.getDynamicProperty("void:homes");
        return homesRaw ? JSON.parse(homesRaw) : {};
    }
    addHome(player, homeName) {
        const homes = this.getAllHomes(player);
        homes[homeName] = {
            location: player.location,
            dimension: player.dimension.id
        };
        player.setDynamicProperty("void:homes", JSON.stringify(homes));
    }
    deleteHome(player, homeName) {
        const homes = this.getAllHomes(player);
        homes[homeName] = {
            location: null,
            dimension: null
        };
        player.setDynamicProperty("void:homes", JSON.stringify(homes));
    }
    parseArguments() {
        let result = "";
        for (const arg of this.arguments) {
            result += ` <${arg}>`;
        }
        return result;
    }
    checkForAdminRequired(player) {
        return !(this.adminRequired && !player.hasTag("admin"));
    }
}
