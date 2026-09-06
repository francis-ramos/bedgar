import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Guild from "../../schema/Guild";
import reply from "./bin/reply";

export default {
    data: new SlashCommandBuilder()
        .setName("auto-roles")
        .setDescription("Assign roles to be automatically given to new users")
        .addSubcommand(k => k.setName("add").setDescription("Add a specific role")
            .addRoleOption(r => r.setName("role").setDescription("Mention the specific role").setRequired(true)))
        .addSubcommand(k => k.setName("remove").setDescription("Remove a specific role")
        .addRoleOption(r => r.setName("role").setDescription("Mention the specific role").setRequired(true)))
        .addSubcommand(k => k.setName("list").setDescription("Returns the list of auto roles")),
    async run(interaction: ChatInputCommandInteraction) {
        const guildId = interaction.guildId;
        const guild = await Guild.findOne({ guildId });

        const administrativeRole = guild?.administrativeRole;
        const whitelistedRole = guild?.whitelistRole ?? [];
        const administrativeRoleCache = interaction.guild?.roles.cache.get((administrativeRole as any));

        if (!administrativeRole || whitelistedRole.length <= 0 || !administrativeRoleCache) {
            await reply(interaction, "The server have no administrative role, use `/set-role admin`");
            return;
        }

        let proceed = false;

        if ((interaction.member?.roles as any).cache.has(administrativeRole)) {
            proceed = true;
        }

        for (let K of whitelistedRole) {
            if ((interaction.member?.roles as any).cache.has(K)) {
                proceed = true
            }
        }

        if (!proceed) {
            await reply(interaction, "You have no administrative role");
            return;
        }

        const role: any = interaction.options.getRole('role');
        const sub = interaction.options.getSubcommand();
        let autoroles = guild.autoRoles ?? [];

        switch(sub) {
            case 'add':
                if (autoroles.find(K => K == role.id)) {
                    await reply(interaction, "The role is already listed");
                    return;
                }

                autoroles.push(role.id);
                await guild.updateOne({ autoRoles: autoroles });
                await reply(interaction, `${role.toString()} have been added to auto roles.`);
                break;
            case 'remove':
                if (!autoroles.find(K => K == role.id)) {
                    await reply(interaction, "The role is not listed");
                    return;
                }

                autoroles[autoroles.indexOf(role.id)] = null;
                autoroles = autoroles.filter(Boolean);

                await guild.updateOne({ autoRoles: autoroles });
                await reply(interaction, `${role.toString()} have been removed from auto roles.`);
                break;
            case 'list':
                const mentionify = (K: Array<any>) => {
                    return K.map((V: string) => interaction.guild?.roles.cache.get(V) ?? null).filter(Boolean);
                }
                const mention1 = mentionify(autoroles).map(K => K?.toString()).join(' ');
                await interaction.reply({ content: ['## Auto Roles', mention1].join("\n") })
        }


    }
}