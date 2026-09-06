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

    if (con2) {
        (whitelistRoles as any)[whitelistRoles.indexOf(con2)] = null;
        (whitelistRoles as any) = whitelistRoles.filter(Boolean);
        blacklistRoles.push(role.id);

        await guild.updateOne({ blacklistRole: blacklistRoles, whitelistRole: whitelistRoles });
        await reply(interaction, `${role.toString()} have been transferred to blacklisted roles`);
        return;
    } else if (con1) {
        await reply(interaction, `The role is already blacklisted`);
        return;
    }

    blacklistRoles.push(role.id);
    await guild.updateOne({ blacklistRole: blacklistRoles });
    await reply(interaction, `The role ${role.toString()} have been blacklisted`);
}