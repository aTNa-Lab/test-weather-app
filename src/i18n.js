import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      current_weather: "Current weather",
      extended_forecast: "Extended Forecast",
      feels_like: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
      days: {
        Sun: "Sun",
        Mon: "Mon",
        Tue: "Tue",
        Wed: "Wed",
        Thu: "Thu",
        Fri: "Fri",
        Sat: "Sat",
      },
      weather: {
        clear: "Clear",
        clear_description: "Clear sky",
        mainlyClear: "Mainly Clear",
        mainlyClear_description: "Mainly clear sky",
        partlyCloudy: "Partly Cloudy",
        partlyCloudy_description: "Partly cloudy sky",
        overcast: "Overcast",
        overcast_description: "Overcast sky",
        fog: "Fog",
        fog_description: "Foggy conditions",
        rimeFog: "Rime Fog",
        rimeFog_description: "Depositing rime fog",
        drizzle_light: "Light Drizzle",
        drizzle_moderate: "Moderate Drizzle",
        drizzle_dense: "Dense Drizzle",
        rain_slight: "Slight Rain",
        rain_moderate: "Moderate Rain",
        rain_heavy: "Heavy Rain",
        snowfall_slight: "Slight Snowfall",
        snowfall_moderate: "Moderate Snowfall",
        snowfall_heavy: "Heavy Snowfall",
        rainShowers_slight: "Slight Rain Showers",
        rainShowers_moderate: "Moderate Rain Showers",
        rainShowers_violent: "Violent Rain Showers",
        thunderstorm: "Thunderstorm",
        thunderstorm_slightHail: "Thunderstorm with Slight Hail",
        thunderstorm_heavyHail: "Thunderstorm with Heavy Hail",
        unknown: "Unknown",
        unknown_description: "Unknown weather condition",
      },
    },
  },
  ru: {
    translation: {
      current_weather: "Погода сейчас",
      extended_forecast: "Прогноз на 5 дней",
      feels_like: "Ощущается как",
      humidity: "Влажность",
      wind: "Ветер",
      pressure: "Давление",
      days: {
        Sun: "Воскр",
        Mon: "Пон",
        Tue: "Втор",
        Wed: "Ср",
        Thu: "Четв",
        Fri: "Пят",
        Sat: "Суб",
      },
      weather: {
        clear: "Ясно",
        clear_description: "Ясное небо",
        mainlyClear: "Преимущественно ясно",
        mainlyClear_description: "Преимущественно ясное небо",
        partlyCloudy: "Переменная облачность",
        partlyCloudy_description: "Переменная облачность",
        overcast: "Пасмурно",
        overcast_description: "Пасмурное небо",
        fog: "Туман",
        fog_description: "Туманные условия",
        rimeFog: "Осадочный иней",
        rimeFog_description: "Осадочный иней",
        drizzle_light: "Легкая морось",
        drizzle_moderate: "Умеренная морось",
        drizzle_dense: "Сильная морось",
        rain_slight: "Легкий дождь",
        rain_moderate: "Умеренный дождь",
        rain_heavy: "Сильный дождь",
        snowfall_slight: "Легкий снегопад",
        snowfall_moderate: "Умеренный снегопад",
        snowfall_heavy: "Сильный снегопад",
        rainShowers_slight: "Легкие ливни",
        rainShowers_moderate: "Умеренные ливни",
        rainShowers_violent: "Сильные ливни",
        thunderstorm: "Гроза",
        thunderstorm_slightHail: "Гроза с небольшим градом",
        thunderstorm_heavyHail: "Гроза с сильным градом",
        unknown: "Неизвестно",
        unknown_description: "Неизвестное погодное условие",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
