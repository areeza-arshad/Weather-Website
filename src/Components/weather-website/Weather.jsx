import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../../Assets/search.png';
import clear_icon from '../../Assets/clear.png';
import cloudy_icon from '../../Assets/cloudy.png';
import drizzle_icon from '../../Assets/drizzle.png';
import rain_icon from '../../Assets/rain.png';
import snow_icon from '../../Assets/snow.png';
import wind_icon from '../../Assets/wind.png';
import humidity_icon from '../../Assets/humidity.png'
const apiKey = process.env.REACT_APP_ID;

const Weather = () => {
    const [weather, setWeather] = useState(false);
    const inputRef = useRef()
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
        
    }
    const weatherFetch = async (city) => {
        if (city=== "") {
            alert("Please enter the city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            const response = await fetch(url);
            const data = await response.json()
            console.log(data);
            if (!response.ok) {
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon; 
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeather(false);
            console.error("Error in fetching data");
        }
    }
    useEffect(()=> {
        weatherFetch("london")
    },[])
  return (
      <div  className="container">
        <div  className="weather-app">
            <div  className="flex">
                <div  className="search-box">           
                    <input ref={inputRef} type="text" id="userInput" placeholder="search"/>
                    <button  className="btn">
                        <img src={search_icon} alt="" onClick={()=> weatherFetch(inputRef.current.value)}/>
                    </button>
                </div>
            </div>
            {/* <div  className="error">
                Invalid city name
            </div> */}
            {weather?<>
                <div  className="city-data">
                <div  className="city-details">
                    <div  className="name">{weather.location}</div>
                    <img  className="weather-icon" src={weather.icon} alt="Weather Icon"/>
                    {/* <div  className="city-img">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"  className=""><g><path fill="#f9ae00" d="M135.228 310a109.99 109.99 0 1 1 70.518 25.578A109.755 109.755 0 0 1 135.228 310" opacity="1" data-original="#f9ae00"></path><g fill="#fdd83b"><path d="M205.746 77.478a10 10 0 0 1-10-10V29.846a10 10 0 0 1 20 0v37.632a10 10 0 0 1-10 10zM126.7 98.662a10 10 0 0 1-8.67-5L99.213 61.071a10 10 0 0 1 17.32-10l18.817 32.59a10 10 0 0 1-8.651 15zM68.806 156.536a9.959 9.959 0 0 1-4.991-1.341l-32.589-18.816a10 10 0 1 1 10-17.32l32.589 18.816a10 10 0 0 1-5.009 18.661zM47.632 235.592H10a10 10 0 0 1 0-20h37.632a10 10 0 0 1 0 20zM36.235 333.467a10 10 0 0 1-5.009-18.662l32.589-18.816a10 10 0 1 1 10 17.321l-32.589 18.815a9.947 9.947 0 0 1-4.991 1.342zM342.688 156.536a10 10 0 0 1-5.01-18.661l32.59-18.816a10 10 0 1 1 10 17.32l-32.59 18.821a9.953 9.953 0 0 1-4.99 1.336zM284.794 98.662a10 10 0 0 1-8.65-15l18.815-32.59a10 10 0 0 1 17.32 10l-18.815 32.59a10 10 0 0 1-8.67 5z" fill="#fdd83b" opacity="1" data-original="#fdd83b"  className=""></path></g><path fill="#80cdf6" d="M438.935 338.585a85.6 85.6 0 0 0-158.163-64.635 65.622 65.622 0 0 0-95.433 39.313 85.985 85.985 0 1 0-22.813 168.891h267.4a72.067 72.067 0 0 0 9.01-143.569z" opacity="1" data-original="#80cdf6"></path></g></svg>
                    </div> */}
                    <div  className="temprature">
                        {weather.temperature}°C
                    </div>
                </div>
                <div  className="weather-details">
                    <div  className="card1">
                        <div  className="sunrise-img"><img src={cloudy_icon} alt="" /></div>
                        <div  className="sunrise">sunrise</div>
                        <div  className="sunrise-time">7:00</div>
                    </div>
                    
                    <div  className="card2">
                        <div  className="wind-img"><img src={wind_icon} alt="" /></div>
                        <div  className="wind-name">wind</div>
                        <div  className="wind">{weather.windSpeed}km/h</div>
                    </div>
                    
                    <div  className="card3">
                        <div  className="humidity-img"><img src={humidity_icon} alt="" /></div>
                        <div  className="humidity-name">humidity</div>
                        <div  className="humidity">{weather.humidity}%</div>
                    </div>
                </div>
                <div  className="forecast"></div>
            </div>
            </>:<></>}
            
        </div>
    </div>
  )
}

export default Weather
