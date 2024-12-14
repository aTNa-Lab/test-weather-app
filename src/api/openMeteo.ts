import { fetchWeatherApi } from "openmeteo";
import { parseWMOCode } from "./weatherCodeParser";

const baseUrl = "https://api.open-meteo.com/v1/forecast";

export const fetchWeatherData = async (
  city: string | { lat: number; lng: number, name?: string }
) => {
  let latitude: number, longitude: number;

  // Geocoding or direct coordinates
  if (typeof city === "string") {
    throw new Error("Geocoding not implemented. Provide coordinates.");
  } else {
    latitude = city.lat;
    longitude = city.lng;
  }

  const params = {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "surface_pressure",
      "wind_speed_10m",
    ],
    daily: ["temperature_2m_max", "temperature_2m_min"],
    timezone: "auto",
    forecast_days: 1,
  };

  try {
    const responses = await fetchWeatherApi(baseUrl, params);
    if (!responses || responses.length === 0) {
      throw new Error("No weather data found");
    }

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds?.() || 0;
    const current = response.current()!;
    const daily = response.daily()!;

    if (!current || !daily) {
      throw new Error("Current weather data is missing");
    }

    return {
      cod: 200, // OpenMeteo does not provide this, so we add it manually
      name: city.name, // OpenMeteo does not return location names
      main: {
        temp: Math.round(current.variables(0)!.value()), // Rounded to the nearest integer
        feels_like: Math.round(current.variables(2)!.value()), // Rounded to the nearest integer
        temp_min: Math.round(daily.variables(1)!.valuesArray()![0]), // Rounded to the nearest integer
        temp_max: Math.round(daily.variables(0)!.valuesArray()![0]), // Rounded to the nearest integer
        pressure: Math.round(current.variables(5)!.value()), // Rounded to 2 decimal places
        humidity: Math.round(current.variables(1)!.value()), // Rounded to the nearest integer
      },
      wind: {
        speed: Number(current.variables(6)!.value().toFixed(1)), // Rounded to 1 decimal place
        deg: null,
      },
      sys: {
        country: null,
        sunrise: null,
        sunset: null,
      },
      weather: {
        id: current.variables(4)!.value(),
        main: parseWMOCode(current.variables(4)!.value()).main, // Map OpenMeteo weather code to a human-readable description
        description: parseWMOCode(current.variables(4)!.value()).description,
        icon: "Icon Placeholder",
      },
    };
  } catch (error) {
    // Narrow the `error` type
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      cod: 500, // Indicate an internal error
      message: errorMessage,
    };
  }
};

export const fetchExtendedForecastData = async (
  city: string | { lat: number; lng: number }
) => {
  let latitude: number, longitude: number;

  // Handle input to extract coordinates
  if (typeof city === "object") {
    latitude = city.lat;
    longitude = city.lng;
  } else {
    throw new Error("Geocoding not implemented. Provide coordinates.");
  }

  const params = {
    latitude,
    longitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  try {
    const responses = await fetchWeatherApi(url, params);

    if (!responses || responses.length === 0) {
      throw new Error("No weather data found");
    }

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;

    // Helper function to generate time range
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Transform data to match the required structure
    const timeArray = range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000));

    const forecast = timeArray.map((date, index) => ({
      day: date.toISOString(), // Use ISO strings for consistency
      temp: {
        temp_max: Math.round(daily.variables(1)!.valuesArray()![index]), // Max temperature
        temp_min: Math.round(daily.variables(2)!.valuesArray()![index]), // Min temperature
      },
      weather: {
        id: daily.variables(0)!.valuesArray()![index], // Weather code
        main: parseWMOCode(daily.variables(0)!.valuesArray()![index]).main, // Map weather code to human-readable text if needed
        description: parseWMOCode(daily.variables(0)!.valuesArray()![index]).description, // Add detailed description if available
      },
    }));

    return { list: forecast }; // Match the output structure used in `weather.ts`
  } catch (error) {
    console.error("Error fetching extended forecast data:", error);
    throw error;
  }
};
