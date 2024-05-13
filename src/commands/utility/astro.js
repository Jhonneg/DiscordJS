import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fetchForecast from "../../requests/forecast.js";

const data = new SlashCommandBuilder()
  .setName("astro")
  .setDescription("Replies with the astronomial information for the day")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "Location can be a city, zip/postal code or a latitude and longitude"
      )
      .setRequired(true);
  });

async function execute(interaction) {
  await interaction.deferReply();
  const location = interaction.options.getString("location");
  try {
    const { weatherData, locationName } = await fetchForecast(location);
    const embed = new EmbedBuilder()
      .setColor("#FFA500")
      .setTitle(`Astronomical forecast for ${locationName}`)
      .setTimestamp()
      .setFooter({
        text: "Powered by the weatherapi.com API",
      });
    for (const day of weatherData) {
      embed.addFields({
        name: day.date,
        value: `🌅 Sunrise: ${day.sunriseTime}\n 🌇 Sunset:${day.sunsetTime}\n 🌕 Moonrise:${day.moonriseTime}\n 🌒 Moonset:${day.moonsetTime}`,
      });
    }
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

export default {
  data,
  execute,
};
