import { Events, GuildMember } from "discord.js";
import Guild from ".../../../schema/Guild";

export default [
    Events.GuildMemberAdd,
    'on',
    async function (member: GuildMember) {
        const guildId = member.guild.id;
        let guild = await Guild.findOne({ guildId });
        if (!guild) {
            await Guild.create({ guildId });
            return;
        }

        let autoroles = guild.autoRoles ?? [];
        autoroles = autoroles.map((K: any) => member.guild.roles.cache.get(K) ?? null).filter(Boolean);

        for (let R of autoroles) {
            member.roles.add(R).catch(() => null);
        }

    }
]