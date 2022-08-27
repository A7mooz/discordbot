import { handleListener, handleRegistry, initiateCommands } from '#core';
import { LogLevel } from '#lib/enums';
import { Command, Listener, Logger } from '#lib/structures';
import {
	Client as DJSClient,
	Collection,
	GatewayIntentBits,
	Partials,
} from 'discord.js';
import 'dotenv/config';

export class Client<Ready extends boolean = boolean> extends DJSClient<Ready> {
	public constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
			],
			partials: [Partials.Channel],
		});

		this.logger.setLevel(LogLevel.Debug);
		this.prefixes = ['q!', '!'];
		this.ownerIds = ['697795666373640213'];
	}

	public prefixes: string[] = [];

	public ownerIds: string[] = [];

	public commands = new Collection<string, Command>();

	public listener = new Collection<string, Listener>();

	public logger: Logger = new Logger();

	public override async login(token?: string | undefined): Promise<string> {
		handleRegistry(this);
		handleListener(this);
		const promiseString = await super.login(token);
		this.logger.info(`Logged in as ${this.user?.tag}`);
		await initiateCommands(this, true, true);
		return promiseString;
	}
}

declare module 'discord.js' {
	interface Client {
		ownerIds: string[];
		commands: Collection<string, Command>;
		listener: Collection<string, Listener>;
		logger: Logger;
		prefixes: string[];
	}
}
