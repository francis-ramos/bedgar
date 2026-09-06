import { Events, REST, Routes } from "discord.js";

export default [
    Events.ClientReady,
    'once',
    async function(client: any, config: any) {
        const rest = new REST({ version: '10' }).setToken(config.token);

        const body = Array.from(client.commands.values()).map(i => (i as any).data.toJSON());

        const data: any = await rest.put(Routes.applicationCommands(client.user?.id), { body });

        console.log(`Registered ${data.length} commands`);
    }
]