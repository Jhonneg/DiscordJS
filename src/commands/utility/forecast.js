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
          value: "metric",
        },

        { name: "Imperial", value: "imperial" }
      );
  });

async function execute(interaction) {
  const location = interaction.options.getString("location");
  const units = interaction.options.getString("units") || "metric";
  const isMetric = units === "metric";
  const { weatherData, locationName } = await fetchForecast(location);
  const embed = new EmbedBuilder()
    .setColor("#FFA500")
    .setTitle(`Weather forecast for ${locationName}`)
    .setDescription(`Using the ${units}`)
    .setTimestamp()
    .setFooter({
      text: "Powered by the weatherapi.com API",
    });
  for (const days of weatherData) {
    const temperatureMin = isMetric
      ? days.temperatureMinC
      : days.temperatureMaxC;
    const temperatureMax = isMetric
      ? days.temperatureMinC
      : days.temperatureMaxC;
    embed.addFields({
      name: days.date,
      value: `Low is ${temperatureMin} the high is ${temperatureMax}`,
    });
  }
  await interaction.reply("The weather is great");
}

export default {
  data,
  execute,
};
