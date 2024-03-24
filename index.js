const { Client, Events, GatewayIntentBits, REST } = require("discord.js");
const { clientReadyHandler } = require(".event/ready");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
const { token } = require("./config.json");

client.on(Events.ClientReady, clientReadyHandler);
client.login(token);
