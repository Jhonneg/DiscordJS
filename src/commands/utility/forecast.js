import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fetchForecast from "../../requests/forecast.js";

const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Replies with the weather forecast")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "Location can be a city, zip/postal code or a latitude and longitude"
      )
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName("units")
      .setDescription("The unit system of the results: metric or imperial")
      .setRequired(false)
      .addChoices(
        {
          name: "Metric",
          value: "metric system",
        },

        { name: "Imperial", value: "imperial system" }
      );
  });

async function execute(interaction) {
  await interaction.deferReply();
  const location = interaction.options.getString("location");
  const units = interaction.options.getString("units") || "metric";
  const isMetric = units === "metric";
  try {
    const { weatherData, locationName } = await fetchForecast(location);
    const embed = new EmbedBuilder()
      .setColor("#FFA500")
      .setTitle(`Weather forecast for ${locationName}`)
      .setDescription(`Using the ${units} system`)
      .setTimestamp()
      .setFooter({
        text: "Powered by the weatherapi.com API",
      });
    for (const day of weatherData) {
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMaxC;
      const temperatureMax = isMetric
        ? day.temperatureMinC
        : day.temperatureMaxC;
      embed.addFields({
        name: day.date,
        value: `⬇️Low:${temperatureMin}°, ⬆️ High ${temperatureMax}°`,
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
