import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import {Container, Header, Body, Footer} from './style';

export default function Main() {

  const [inputValue, setInputValue] = useState('');
  const [icon, setIcon] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [wind, setWind] = useState('');
  const [feelslike, setFeelslike] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [contator, setContator] = useState(0);

  const [contatorError, setContatorError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

    function contato(count) {
      setContator(contator + count)
    }

    async function handleAddCity(e) {
    try {
      setLoading(true);
      setError(false)
      setContatorError(false)

      e.preventDefault();
      setInputValue('');
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=46e586f611564e4ff8750dd7089dd4cd`;
      const request = axios.get(url);
      const response = await request;
      console.log(response)
  
      if(response.status === 200) {
        setLoading(false)
        setError(false)
        setContatorError(false)
        const data = {
          name: response.data.name,
          country: response.data.sys.country,
          timezone: response.data.timezone,
          icon: response.data.weather[0].icon,
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          pressure: response.data.main.pressure,
          visibility: response.data.visibility,
          humidity: response.data.main.humidity,
        }
        setWeatherData(data)
      } else if(response.status === 404 || response.status !== 200) {
        setLoading(false)
        setError(true)
      }
  
      const code_icon = response.data.weather[0].icon;
      const icon = `http://openweathermap.org/img/wn/${code_icon}@2x.png`;
      setIcon(icon);
  
      const temperature = parseFloat(parseFloat(response.data.main.temp) - 273.15).toFixed(0)
      setTemperature(temperature);
  
      const timeZone = response.data.timezone; // timezone in seconds API
      const convertTimeZoneInGMT = parseFloat(parseFloat(timeZone / 60) / 60 ); // Convert seconds to GMT
  
      const wind = parseFloat(response.data.wind.speed * 3.6).toFixed(0)
      setWind(wind);
  
      const feels_like = parseFloat(parseFloat(response.data.main.feels_like) - 273.15).toFixed(0)
      setFeelslike(feels_like);
  
      if(convertTimeZoneInGMT < 0) {
        const convertNumberGMTToPositive = convertTimeZoneInGMT * -1
        const hourUTC = new Date().getUTCHours() // Hour international UTC
  
        const currentDate = new Date();
  
        const [year, month, day, hour, minutes, seconds] = [
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds(),
        ];
          
        const localHour = new Date(year, month, day, hourUTC - convertNumberGMTToPositive, minutes, seconds);
        
        setWeekDay(`
          ${localHour.toLocaleString()}
        `)
              
      } else if (convertTimeZoneInGMT >= 0) {
          const hourUTC = new Date().getUTCHours() // Hour international UTC
          const currentDate = new Date();
  
          const [year, month, day, hour, minutes, seconds] = [
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
          ];
          
          const localHour = new Date(year, month, day, hourUTC + convertTimeZoneInGMT, minutes, seconds);
          
          setWeekDay(`
            ${localHour.toLocaleString()}
          `)
        }
      } catch(err) {
        setLoading(false)
        setError(true)
        setContatorError(true)
      }
    }
  
    return(
      <Container>
        <Header>
          {
            error === true 
            ? <form onSubmit={handleAddCity} >
                <input 
                  className="input-error"
                  type="text" 
                  placeholder="Search your city"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button type="submit" onClick={()=> contato(1)}><FiSearch /></button> 
              </form>
            : <form onSubmit={handleAddCity} >
                <input 
                  type="text" 
                  placeholder="Search your city"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button type="submit" onClick={()=> contato(1)}><FiSearch /></button> 
              </form>
          }
          
        </Header>
        <Body>
          { 
          contatorError === true ? <p className="empty-error">no cities found.</p> :
          
          contator === 0 ? <p className="empty">no cities surveyed.</p> :
          
          loading
            ? <p>Loading...</p> :
            <>
            <div className="box-city-day" >
              <p className="city" >{weatherData.name}, {weatherData.country}</p>
              <p className="dayweek" >{weekDay}</p>
            </div>
            <div className="box-deggres" >
              <img src={icon} alt="sun" />
              <p className="deggres" >{temperature}<span>º</span></p>
              <p className="condition" >{weatherData.description}</p>
            </div>
            </>
          }
        </Body>
        <Footer>
          { 
            contatorError === true ? '' :
          
            contator === 0 ? '' :

            contator === 0 ? <p className="empty">no values.</p> :
            loading 
            ? <p>loading...</p>
            : <> 
            <p className="day" >Today</p>
            <div className="box-footer" >
              <div className="box-wind" >
                <p className="title-wind" >Wind</p>
                <p className="number-wind" >{wind}Km/h</p>
              </div>
              <div className="box-feels_like" >
                <p className="title-feels_like" >Feels like</p>
                <p className="number-feels_like" >{feelslike}º</p>
              </div>
              <div className="box-humidity" >
                <p className="title-humidity" >Humidity</p>
                <p className="number-humidity" >{weatherData.humidity}%</p>
              </div>
            </div>
          </>
          }
        </Footer>
      </Container>
    );
}