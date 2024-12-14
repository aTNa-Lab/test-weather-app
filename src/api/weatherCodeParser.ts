import i18next from 'i18next';

// Define WMO codes with keys for internationalization
const WMOCodeKeys: Record<number, { mainKey: string; descriptionKey: string }> = {
  0: { mainKey: "weather.clear", descriptionKey: "weather.clear.description" },
  1: { mainKey: "weather.mainlyClear", descriptionKey: "weather.mainlyClear.description" },
  2: { mainKey: "weather.partlyCloudy", descriptionKey: "weather.partlyCloudy_description" },
  3: { mainKey: "weather.overcast", descriptionKey: "weather.overcast_description" },
  45: { mainKey: "weather.fog", descriptionKey: "weather.fog_description" },
  48: { mainKey: "weather.rimeFog", descriptionKey: "weather.rimeFog_description" },
  51: { mainKey: "weather.drizzle_light", descriptionKey: "weather.drizzle_light" },
  53: { mainKey: "weather.drizzle_moderate", descriptionKey: "weather.drizzle_moderate" },
  55: { mainKey: "weather.drizzle_dense", descriptionKey: "weather.drizzle_dense" },
  61: { mainKey: "weather.rain_slight", descriptionKey: "weather.rain_slight" },
  63: { mainKey: "weather.rain_moderate", descriptionKey: "weather.rain_moderate" },
  65: { mainKey: "weather.rain_heavy", descriptionKey: "weather.rain_heavy" },
  71: { mainKey: "weather.snowfall_slight", descriptionKey: "weather.snowfall_slight" },
  73: { mainKey: "weather.snowfall_moderate", descriptionKey: "weather.snowfall_moderate" },
  75: { mainKey: "weather.snowfall_heavy", descriptionKey: "weather.snowfall_heavy" },
  80: { mainKey: "weather.rainShowers_slight", descriptionKey: "weather.rainShowers_slight" },
  81: { mainKey: "weather.rainShowers_moderate", descriptionKey: "weather.rainShowers_moderate" },
  82: { mainKey: "weather.rainShowers_violent", descriptionKey: "weather.rainShowers_violent" },
  95: { mainKey: "weather.thunderstorm", descriptionKey: "weather.thunderstorm" },
  96: { mainKey: "weather.thunderstorm_slightHail", descriptionKey: "weather.thunderstorm_slightHail" },
  99: { mainKey: "weather.thunderstorm_heavyHail", descriptionKey: "weather.thunderstorm_heavyHail" },
};

/**
 * Parses a WMO code into a human-readable, localized weather description.
 * @param code - The WMO code.
 * @returns An object containing `main` and `description` strings translated to the current locale.
 */
export const parseWMOCode = (code: number): { main: string; description: string } => {
  const keys = WMOCodeKeys[code];
  if (!keys) {
    return {
      main: i18next.t("weather.unknown"),
      description: i18next.t("weather.unknown_description"),
    };
  }
  
  return {
    main: i18next.t(keys.mainKey),
    description: i18next.t(keys.descriptionKey),
  };
};