import { MessageFlags, PermissionFlagsBits, type ChatInputCommandInteraction } from "discord.js";
import Guild from "../../../schema/Guild";
import reply from "./reply";

export default async function(interaction: ChatInputCommandInteraction) {
    const role: any = interaction.options.getRole('role');
    const roleCache = interaction.guild?.roles.cache.get(role.id);
    const memberCache = interaction.guild?.members.cache.get(interaction.user.id);

    if (!memberCache?.permissions.has([PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild])) {
        await reply(interaction, "You have no `administrator` or `manage_guild` permission");
        return;
    }

    if (!roleCache?.permissions.has([PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild])) {
        await reply(interaction, "The role have no `administrator` or `manage_guild` permission");
        return;
    }

    await Guild.findOneAndUpdate({ guildId: interaction.guildId }, { administrativeRole: role.id });

    await reply(interaction, `The role ${role.toString()} have been assigned as administrative role.`);
}