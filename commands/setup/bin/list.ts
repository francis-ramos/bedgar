import { bold, underline, type ChatInputCommandInteraction } from "discord.js";
import Guild from "../../../schema/Guild";
import reply from "./reply";

export default async function (interaction: ChatInputCommandInteraction) {
    const guildId = interaction.guildId;
    const guild = await Guild.findOne({ guildId });
    const administrative_role = guild?.administrativeRole;
    const whitelistedRoles = guild?.whitelistRole ?? [];

    if (!administrative_role) {
        await reply(interaction, "The server have no administrative role, use `/set-role admin`");
        return;
    }

    let proceed = false;
    
    if ((interaction.member?.roles as any).cache.has(administrative_role)) {
        proceed = true
    }
    
    for (let K of whitelistedRoles) {
        if ((interaction.member?.roles as any).cache.has(K)) {
            proceed = true
        }
    }
    
    if (!proceed) {
        await reply(interaction, "You have no administrative role");
        return;
    }

    const administativeRole = guild.administrativeRole ?? '';
    let whitelistRoles = guild.whitelistRole ?? [];
    let blacklistRoles = guild.blacklistRole ?? [];

    const mentionify = (K: Array<any>) => {
        return K.map((V: string) => interaction.guild?.roles.cache.get(V) ?? null).filter(Boolean);
    }
    
    const mention1 = interaction.guild?.roles.cache.get(administativeRole)?.toString() ?? "none";
    const mention2 = mentionify(whitelistRoles).map((K: any) => K.toString()).join(' ');
    const mention3 = mentionify(blacklistRoles).map((K: any) => K.toString()).join(' ');

    await interaction.reply({
        content: [
            '## Administrative Role', mention1,
            '', '## Whitelisted', mention2,
            '', '## Blacklisted', mention3
        ].join("\n")
    })

}