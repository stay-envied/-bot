import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('force-nick')
        .setDescription('Force a member to have a nickname.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to rename')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('nickname')
                .setDescription('New nickname')
                .setRequired(true)
        ),

    async execute(interaction) {
        const member = await interaction.guild.members.fetch(
            interaction.options.getUser('user').id
        );

        const nickname = interaction.options.getString('nickname');

        if (!member.manageable) {
            return interaction.reply({
                content: 'I cannot change that user\'s nickname because their role is higher than mine.',
                ephemeral: true,
            });
        }

        await member.setNickname(nickname);

        return interaction.reply({
            content: `✅ Changed ${member.user.tag}'s nickname to **${nickname}**.`,
        });
    },
};
