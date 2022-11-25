import { useEffect, useState } from 'react';

import WidgetClimaHora from './components/WidgetTempo';
import Main from './components/Main';
import CityDate from './components/CityDate';


function App() {
  // consumindo a API
  const dateHour = new Date();

  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState();

  // recebe o valor do input
  const handleChenge = (e) => {
    setCity(e.target.value);
  };

  const msg = document.querySelector(".loading");

  // carrega a página de acordo com a cidade pesquisada
  const handleSarch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b21ff113aed34a84aa2214715221411&q=${city}&lang=pt`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 400) {
          setWeatherForecast(null);
          msg.textContent = "Por favor, procure uma cidade válida 😩";
        }
      }).then((data) => {
        setWeatherForecast(data);
      })
  };

  // carrega a página com a localização atual do usuário
  const currentLocation = (lat, long) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b21ff113aed34a84aa2214715221411&q=${lat},${long}&lang=pt`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((data) => {
        setWeatherForecast(data);
      })
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation(position.coords.latitude, position.coords.longitude);
    })
  }, []);


  return (
    <>
      <div className="App">
        <div className="container">
          <nav>
            <div>
              <h1>Clima</h1>
              <small>Veja como está o clima em sua cidade.</small>
              <div className="search">
                <input onChange={handleChenge} type="text" placeholder="busque uma cidade" value={city} />
                <button id="btn" onClick={handleSarch}><span className="material-symbols-rounded"> search </span></button>
              </div>
            </div>
          </nav>
          {
            weatherForecast ? (
              <>
                <CityDate
                  name={weatherForecast.location.name}
                  region={weatherForecast.location.region}
                  date={dateHour.toLocaleDateString()}
                  time={dateHour.toLocaleTimeString()}
                />

                <Main
                  degrees={parseInt(weatherForecast.current.temp_c)}
                  img={weatherForecast.current.condition.icon}
                  condition={weatherForecast.current.condition.text}
                  max={parseInt(weatherForecast.forecast.forecastday[0].day.maxtemp_c)}
                  min={parseInt(weatherForecast.forecast.forecastday[0].day.mintemp_c)}
                  air={weatherForecast.current.wind_kph}
                  humidity={weatherForecast.current.humidity}
                />

                <WidgetClimaHora
                  hour={weatherForecast.forecast.forecastday[0].hour[22].time.split(" ")[1]}
                  img={weatherForecast.forecast.forecastday[0].hour[22].condition.icon}
                  deg={parseInt(weatherForecast.forecast.forecastday[0].hour[22].temp_c)}
                  arrHour={(weatherForecast.forecast.forecastday[0].hour).map((e) => e.time.split(" ")[1])}
                />
              </>
            ) : <p className="loading">Carregando ...</p>
          }
        </div>
        <p className="about">Naum Santos Mourão | Site desenvolvido como teste para estágio na empresa <a href="https://wiseinovacao.com/">Wise Inovação</a></p>
      </div >
    </>
  );
}

export default App;
