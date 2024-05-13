import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import clientReadyHandler from "./events/ready.js";
import interactionCreateHandler from "./events/interactionCreate.js";
import pingCommand from "./commands/utility/ping.js";
import "dotenv/config";
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
const port = process.env.PORT || 3000;
client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.DISCORD_TOKEN);
