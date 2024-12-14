import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import Forecast from "../components/Forecast/Forecast";
import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import Spinner from "../components/ui/Spinner/Spinner";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import { AppStore } from "../store/store";
import { fetchWeather } from "../store/fetchWeather";

const Home = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
  }));

  useEffect(() => {
    showPosition();
  }, []);

  const showPosition = () => {
    dispatch(
      fetchWeather({
        lat: 42.8546305,
        lng: 74.584006,
        name: "Бишкек",
      })
    );
  };

  return (
    <>
      {loading && <Spinner />}
      <Header />
      {/* <Search /> */}
      <CurrentWeather />
      <Forecast />
      <Footer />
    </>
  );
};

export default Home;
