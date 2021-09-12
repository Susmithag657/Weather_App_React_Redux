import axios from "axios";

export default class WeatherApi {
  static async getWeather(city) {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=5d409e7055254f56a4a9bc0153ed142c`
    );
    return response.data;
  }
}
