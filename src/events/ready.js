import { REST, Routes } from "discord.js";
import "dotenv/config";
import fetchForecast from "../requests/forecast.js";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
export default async function clientReadyHandler(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  try {
    console.log(`Started refreshing ${client.commands.size} commands`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENTID,
        process.env.GUILDID
      ),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`Successfully reloaded ${data.length} commands!`);
  } catch (error) {
    console.error(error);
  }
}
