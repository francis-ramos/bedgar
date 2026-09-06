import { BaseInteraction, Events } from "discord.js";
import Guild from "../../schema/Guild";

export default [
    Events.InteractionCreate,
    'on',
    async function (interaction: BaseInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const guildId = interaction.guildId;
        const g = await Guild.findOne({ guildId });
        if (!g) {
            await (Guild as any).create({ guildId });
        }

        const client: any = interaction.client;
        const command = client.commands.get(interaction.commandName);

        command.run(interaction);
    }
]