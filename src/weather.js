import React, { useEffect , useRef, useState} from 'react'
import './weather.css'
import search from './Assets/search.png'
import clear from './Assets/clear.png'
import cloud from './Assets/cloud.png'
import snow from './Assets/snow.png'
import wind from './Assets/wind.png'
import rain from './Assets/rain.png'
import drizzle from './Assets/drizzle.png'
import humidity from './Assets/humidity.png'
const Weather = () => {

  const inputRef = useRef()

  const [weather, setWeather] = useState(false);

  const allIcons = {
    "01d" : clear,
    "01n" : clear,
    "02d" : cloud,
    "02n" : cloud,
    "03d" : cloud,
    "03n" : cloud,
    "04d" : drizzle,
    "04n" : drizzle,
    "09d" : rain,
    "09n" : rain,
    "10d" : rain,
    "10n" : rain,
    "13d" : snow,
    "13n" : snow
  }

  const fetchWeather = async (city) => {
    if(city == ""){
      alert("Enter City Name");
      return;
    }
    try {
      const apiKey = '66463eb3bb2237b82ae4f0c3871ead32'; // Put your actual API key here
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        // If the city is not found or an error occurred, alert the user
        if (response.status === 404) {
          alert("City not found. Please enter a valid city name.");
        } else {
          alert("An error occurred while fetching the weather data.");
        }
        return;
      }
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeather({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    fetchWeather('Islamabad');
  }, []);
  return (
    <div className='weather'>
      <div className='Search-bar'>
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src={search} onClick={()=>fetchWeather(inputRef.current.value)}></img>
      </div>

      <div>
        <img src={weather.icon} alt="" className='weather-icon'></img>
        <p className='temperature'>{weather.temperature}°C</p>
        <p className='location'>{weather.location}</p>
        <div className='Weather-data'>
          <div className='col'>
            <img src={humidity}></img>
            <div>
              <p>{weather.humidity}%</p>
              <span>humidity</span>
            </div>
          <div className='col'>
            <img src={wind}></img>
            <div>
              <p>{weather.windspeed}km/h</p>
              <span>wind speed</span>
            </div>
          </div>
        </div>
      </div>


    </div>

    </div>
  )
}

export default Weather