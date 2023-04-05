import { useEffect, useState } from 'react';

import WidgetClimaHora from './components/WidgetTempo';
import Main from './components/Main';
import CityDate from './components/CityDate';
import Search from './components/Search';
import { geolocalizacao } from './utils/consumoClimaTempo';

function App() {
  // consumindo a API
  const dateHour = new Date();

  const [weatherForecast, setWeatherForecast] = useState();
  const [menssageiro, setMensageiro] = useState("");
  const [city, setCity] = useState("");

  // carrega a página com a localização atual do usuário
  const currentLocation = (lat, long) => {
    geolocalizacao(lat, long).then((response) => {
      setWeatherForecast(response);
    });
  };

  // solicita ao usuário permissão para acesso da localização
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation(position.coords.latitude, position.coords.longitude);
    })
  }, []);

  var detalhesDoTempo = [];
  if (weatherForecast) {
    for (var proximaHora = 1; proximaHora <= 5; proximaHora++) {
      detalhesDoTempo.push(
        <WidgetClimaHora
          hour={weatherForecast.forecast.forecastday[0].hour[dateHour.getHours() + proximaHora].time.split(" ")[1]}
          img={weatherForecast.forecast.forecastday[0].hour[dateHour.getHours() + proximaHora].condition.icon}
          deg={parseInt(weatherForecast.forecast.forecastday[0].hour[dateHour.getHours() + proximaHora].temp_c)}
        />
      );
    }
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <Search
            cidade={city}
            setCity={setCity}
            setMensageiro={setMensageiro}
            setWeatherForecast={setWeatherForecast}
          />

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

                <footer>
                  {
                    detalhesDoTempo
                  }
                </footer>
              </>
            ) : null
          }
          <p className="loading">{menssageiro}</p>
        </div>
        <p className="about">🙂 Naum Santos Mourão</p>
      </div >
    </>
  );
}

export default App;
