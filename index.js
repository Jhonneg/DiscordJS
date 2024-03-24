const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
} = require("discord.js");
const { clientReadyHandler } = require("./events/ready");
const pingCommand = require("./commands/utility/ping");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const { token } = require("./config.json");

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.on(Events.ClientReady, clientReadyHandler);
client.login(token);
