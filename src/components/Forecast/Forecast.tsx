import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import ForecastItem from './ForecastItem';
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';
import { t } from 'i18next';

const Forecast: React.FC = () => {
  const { forecast, isInitial } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
  }));

  if (isInitial) return <></>;

  return (
    <ForecastContainer>
      <SectionTitle>{t("extended_forecast")}</SectionTitle>
      <ForecastItems>
        {forecast.map((item, i) => {
          return (
            <ForecastItem
              key={i}
              day={item.day}
              high={item.temp.temp_max}
              low={item.temp.temp_min}
              weatherCode={item.weather.id}
              main={item.weather.main}
              description={item.weather.description}
            />
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;
