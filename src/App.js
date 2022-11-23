import { useEffect, useState } from 'react';

function App() {
  // consumindo a API

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
        console.log(data);

        setWeatherForecast(data);
      })
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation(position.coords.latitude, position.coords.longitude);
    })
  }, []);

  return (
    <div className="App">
      <div className="container">
        <nav>
          <div>
            <h1>Clima</h1>
            <small>Veja como está o clima em sua cidade.</small>
            <div className="search">
              <input onChange={handleChenge} type="text" placeholder="buscar cidade" value={city} />
              <button id="btn" onClick={handleSarch}><span className="material-symbols-rounded"> search </span></button>
            </div>
          </div>
        </nav>

        {
          weatherForecast ? (
            <>
              <section className="cityDate">
                <section className="city">
                  <span className="material-symbols-rounded">pin_drop</span>
                  <p>{weatherForecast.location.name} - {weatherForecast.location.region}</p>
                </section>
                <span className="date">{`Hoje, ${weatherForecast.current.last_updated.split(" ")[0]} às ${weatherForecast.current.last_updated.split(" ")[1]}`}</span>
              </section>

              <main>
                <div className="temperature">
                  <p className="degrees">{`${parseInt(weatherForecast.current.temp_c)}°`}</p>
                  <img src={weatherForecast.current.condition.icon} alt="Icone Tempo" />
                </div>

                <div className='detail'>
                  <p className="">{weatherForecast.current.condition.text}</p>

                </div>

                <section className="maxMin">
                  <div>
                    <span className="material-symbols-sharp"> thermostat </span>
                    <p>{`Máxima: ${parseInt(weatherForecast.forecast.forecastday[0].day.maxtemp_c)}°`}</p>
                  </div>
                  <p>{`Minima: ${parseInt(weatherForecast.forecast.forecastday[0].day.mintemp_c)}°`}</p>
                </section>

                <section className="airHumidity">
                  <div className="air">
                    <span className="material-symbols-sharp">air</span>
                    <p>{`Vento: ${weatherForecast.current.wind_kph} Km/h`}</p>
                  </div>

                  <div className="humidity">
                    <span className="material-symbols-sharp">humidity_percentage</span>
                    <p>{`Umidade: ${weatherForecast.current.humidity}%`}</p>
                  </div>
                </section>
              </main>

              <footer>
                <div className="weatherTime">
                  <p className='hour'> {weatherForecast.forecast.forecastday[0].hour[19].time.split(" ")[1]}</p>
                  <img className='img' src={weatherForecast.forecast.forecastday[0].hour[19].condition.icon} alt="Icone tempo" />
                  <p className='deg'>{`${parseInt(weatherForecast.forecast.forecastday[0].hour[9].temp_c)}°`}</p>
                </div>
              </footer>
            </>
          ) : <p className="loading">Carregando ...</p>
        }
      </div>
      <p className="about">Naum Santos Mourão | Site desenvolvido como teste para estágio na empresa <a href="https://wiseinovacao.com/">Wise Inovação</a></p>
    </div >

  );
}

export default App;
