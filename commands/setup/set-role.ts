import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import AdminSubCommand from "./bin/admin";
import WhitelistCommand from "./bin/whitelist";
import BlacklistCommand from "./bin/blacklist";
import ListCommand from "./bin/list";

export default {
    data: new SlashCommandBuilder()
        .setName("set-role")
        .setDescription("Setup a certain permission role that interacts to the app commands and events")
        .addSubcommand(v => v.setName("admin").setDescription("A role that interacts with administrative level commands")
            .addRoleOption(r => r.setName("role").setDescription("Mention the admin role").setRequired(true)))
        .addSubcommand(v => v.setName("whitelist").setDescription("Assign a role that could interact with administrative level commands")
            .addRoleOption(r => r.setName("role").setDescription("Mention the specific role").setRequired(true)))
        .addSubcommand(v => v.setName("blacklist").setDescription("Assign a role that is prohibited to interact with any level commands")
            .addRoleOption(r => r.setName("role").setDescription("Mention the specific role").setRequired(true)))
        .addSubcommand(v => v.setName('list').setDescription('Returns the list of set roles')),
    async run(interaction: ChatInputCommandInteraction) {
        const command = interaction.options.getSubcommand();
        
        switch (command) {
            case 'admin':
                AdminSubCommand(interaction);
                break;
            case 'whitelist':
                WhitelistCommand(interaction);
                break;
            case 'blacklist':
                BlacklistCommand(interaction);
                break;
            case 'list':
                ListCommand(interaction);
                break;
        }
    }
}