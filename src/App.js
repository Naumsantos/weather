import { useEffect, useState } from 'react';

import Main from './components/Main';
import CityDate from './components/CityDate';
import Search from './components/Search';
import { geolocalizacao } from './utils/consumoClimaTempo';

function App() {
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

  return (
    <>
      <div className="App">
        <div className="container">
          <Search
            city={city}
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
              </>
            ) : null
          }
          <p className="loading">{menssageiro}</p>
        </div>
        <p className="about">🙂 - Naum Santos Mourão</p>
      </div >
    </>
  );
}

export default App;
