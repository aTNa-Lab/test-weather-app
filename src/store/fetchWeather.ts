import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lng: number }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(setIsLoading(true));

    try {
      const res = await Promise.all([fetchWeatherData(city), fetchExtendedForecastData(city)]);
      dispatch(setIsLoading(false));

      if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        return res;
      }
      return rejectWithValue(res[0].message);
    } catch {
      dispatch(setIsLoading(false));
      return rejectWithValue('Error');
    }
  }
);

export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weather = res[0] as WeatherData;
  const forecast: ExtendedForecastData[] = [];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  const everyFourthItem = res[1].list.filter((_: any, index: number) => (index) % 6 === 0);
  const everyFourthItemWithShift = res[1].list.filter((_: any, index:number) => (index + 3) % 6 === 0);

  const mergedList = everyFourthItem.map((item1: any, index: number) => {
    const item2 = everyFourthItemWithShift[index];

    return {
      ...item1, // Start with all properties from item1
      main: {
        ...item1.main, // Keep other main properties from item1
        temp_min: item1.main.temp_min, // Replace temp_min with item1's value
        temp_max: item2.main.temp_max, // Replace temp_max with item2's value
      },
    };
  });

  mergedList.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max: kelvinToCelcius(i.main.temp_max),
        temp_min: kelvinToCelcius(i.main.temp_min),
      },
      weather: {
        id: i.weather[0].id,
        main: i.weather[0].main,
      },
    });
  });

  return {
    weather,
    forecast,
  };
};
