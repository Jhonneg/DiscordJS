const { Events } = require("discord.js");

function clientReadyHandler(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
}

module.exports = {
  clientReadyHandler,
};
