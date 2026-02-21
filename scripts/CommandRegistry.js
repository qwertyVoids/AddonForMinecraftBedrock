import * as CommandInstances from "./Commands/index.commands";
import Command from "./Classes/Command";
export const Commands = {};
export const AdminCommands = {};
Object.values(CommandInstances).forEach((CommandInstance) => {
    try {
        const instance = new CommandInstance();
        if (instance instanceof Command) {
            Commands[instance.commandName.toLowerCase()] = instance;
            if (instance.aliases?.length > 0) {
                instance.aliases.forEach((alias) => {
                    Commands[alias.toLowerCase()] = instance;
                });
            }
        }
    }
    catch (e) {
        console.warn("[Registry] Failed to initialize command.");
    }
});
console.warn(`[Registry] ${Object.keys(Commands).length} commands were successfully initialized.`);
