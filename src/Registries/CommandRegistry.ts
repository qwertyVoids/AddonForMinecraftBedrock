import Command from "../Classes/Command";

export default class CommandRegistry {
    private static instance: CommandRegistry;
    private readonly Commands: Map<string, Command>;
    private readonly Cache: Map<string, any>;
    private constructor() {
        this.Commands = new Map<string, Command>;
        this.Cache = new Map<string, string>();
    }

    public static getInstance(): CommandRegistry {
        if (!CommandRegistry.instance) {
            CommandRegistry.instance = new CommandRegistry();
        }
        return CommandRegistry.instance;
    }

    public register(command: Command): void {
        try {
            this.Commands.set(command.commandName, command);

            command.aliases?.forEach((alias: string): void => {
                this.Commands.set(alias, command);
            });
        } catch (e) {
            console.warn("[Registry] Failed to initialize command.");
        }
    }

    public loadCommands(): void {
        // @ts-ignore
        const context: any = require.context("../Commands", true, /\.tsx?$/);
        const keys: string[] = context.keys();
        keys.forEach((filename: string): void => {
            context(filename);
        });

        this.rebuildAllCache();
        console.warn(`[Registry] ${CommandRegistry.getInstance().getCommandInstanceCount()} commands were successfully initialized.`);
    }

    public rebuildAllCache(): void {
        const commands: Command[] = Array.from(new Set(this.Commands.values()))
            .sort((a: Command, b: Command): number => a.commandName.localeCompare(b.commandName, undefined, { sensitivity: 'base' }));
        this.Cache.set("commands", commands);

        const helpText: string = commands
            .map((cmd: Command): string => `\n\n!${cmd.commandName}: ${cmd.description};`)
            .join("");
        this.Cache.set("help_text", helpText);

        const aliasesText: string = commands
            .map((cmd: Command): string => `\n\n!${cmd.commandName}: ${cmd.aliases?.map((alias: string): string => `!${alias}`)?.join(", ") ?? "Нету"};`)
            .join("");
        this.Cache.set("aliases_text", aliasesText);
    }

    public getCache(key: string): any {
        return this.Cache.get(key);
    }

    public getCommand(commandName: string): Command | undefined {
        return this.Commands.get(commandName);
    }

    public getCommandInstanceCount(): number {
        return this.Commands.size;
    }

    public getCommandCount(): number {
        let commandCount: number = 0;
        for (const [key, instance] of this.Commands) {
            if (key === instance.commandName) {
                commandCount++;
            }
        }
        return commandCount;
    }

    public getAliasCount(): number {
        let aliasCount: number = 0;
        for (const [key, instance] of this.Commands) {
            if (key === instance.commandName) {
                if (instance.aliases.length >= 1) {
                    aliasCount += instance.aliases.length;
                }
            }
        }
        return aliasCount;
    }
}