const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = '97f31a80d4509fc3e9fe758442e1d361';

export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${apiKey}&lang=ru`;

  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&lang=ru`;
  }
  return await (await fetch(url)).json();
};

export const fetchExtendedForecastData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&lang=ru`;

  if (typeof city === 'object') {
    url = `${baseUrl}/forecast?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&lang=ru`;
  }

  return await (await fetch(url)).json();
};
