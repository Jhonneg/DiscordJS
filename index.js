const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { clientReadyHandler } = require("./events/ready");
const { interactionCreateHandler } = require("./events/interactionCreate");
const pingCommand = require("./commands/utility/ping");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const { token } = require("./config.json");

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(token);
