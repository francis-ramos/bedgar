import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";

export default async function (interaction: ChatInputCommandInteraction, M: string) {
    return await interaction.reply({
        content: M,
        flags: MessageFlags.Ephemeral
    });
}
