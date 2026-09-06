import { MessageFlags, PermissionFlagsBits, type ChatInputCommandInteraction } from "discord.js";
import Guild from "../../../schema/Guild";
import reply from "./reply";

export default async function(interaction: ChatInputCommandInteraction) {
    const role: any = interaction.options.getRole('role');
    
    const guildId = interaction.guildId;
    const guild = await Guild.findOne({ guildId });
    const administrative_role = guild?.administrativeRole;

    if (!administrative_role) {
        await reply(interaction, "The server have no administrative role, use `/set-role admin`");
        return;
    }

    if (!(interaction.member?.roles as any).cache.has(administrative_role)) {
        await reply(interaction, "You have no administrative role");
        return;
    }

    let whitelistRoles: Array<string> = guild.whitelistRole ?? [];
    let blacklistRoles: Array<string> = guild.blacklistRole ?? [];
    const con1 = blacklistRoles.find(k => k == role.id);
    const con2 = whitelistRoles.find(k => k == role.id)

    if (con1) {
        (blacklistRoles as any)[blacklistRoles.indexOf(con1)] = null;
        (blacklistRoles as any) = blacklistRoles.filter(Boolean);
        whitelistRoles.push(role.id);

        await guild.updateOne({ blacklistRole: blacklistRoles, whitelistRole: whitelistRoles });
        await reply(interaction, `${role.toString()} have been transferred to whitelist roles`);
        return;
    } else if (con2) {
        await reply(interaction, `The role is already whitelisted`);
        return;
    }

    whitelistRoles.push(role.id);
    await guild.updateOne({ whitelistRole: whitelistRoles });
    await reply(interaction, `The role ${role.toString()} have been whitelisted`);
}