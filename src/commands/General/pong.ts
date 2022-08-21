import { CommandType } from '#lib/enums';
import { Command } from '#lib/structures';

export default new Command({
	type: CommandType.User,
	commandRun(interaction) {
		return interaction.reply({ content: 'Ping!?', ephemeral: true });
	},
});
