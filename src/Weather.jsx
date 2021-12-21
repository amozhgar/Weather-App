import { useEffect, useState } from "react";
import CityWeather from "./CityWeather";
const apiKey = "57464073a8f54d45907115654212112"; //put in your weather api key
let cach = {};
const Weather = (props) => {
  const [location, setLocation] = useState("Arbil");
  const [weather, setWeather] = useState({
    city: location,
    country: "iraq",
    localtime: "2021-12-21",
    icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
    temp: 10,
  });
  //   react hook useEffect
  const updateWeather = async () => {
    if (cach[location]) {
      setWeather(cach[location]);
      return;
    }
    const res =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no
`);
    const data = await res.json();
    const newWeather = {
      city: data.location.name,
      country: data.location.country,
      localtime: data.location.localtime,
      icon: data.current.condition.icon,
      temp: data.current.temp_c,
    };
    cach[location] = newWeather;
    setWeather(newWeather);
  };
  //   react hook keep track to change
  useEffect(() => {
    updateWeather();
  }, [location]);
  return (
    <div className="weather-contaainer">
      <div className="search-area">
        <label htmlFor="location">
          location
          <select
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option value="Arbil">Erbil</option>
            <option value="Tehran">Tehran</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Duhok">Duhok</option>
            <option value="London">London</option>
          </select>
        </label>
      </div>
      <CityWeather
        city={weather.city}
        country={weather.country}
        localtime={weather.localtime}
        icon={weather.icon}
        temp={weather.temp}
      />
    </div>
  );
};

export default Weather;
