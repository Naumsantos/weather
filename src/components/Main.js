const Main = ({ degrees, img, condition, max, min, air, humidity }) => {
  return <>
    <main>
      <div className="temperature">
        <p className="degrees">{`${degrees}°`}</p>
        <img src={img} alt="Icone Tempo" />
      </div>

      <div className='detail'>
        <p className="">{condition}</p>
      </div>

      <section className="maxMin">
        <div>
          <span className="material-symbols-sharp"> thermostat </span>
          <p>{`Máxima: ${max}°`}</p>
        </div>
        <p>{`Minima: ${min}°`}</p>
      </section>

      <section className="airHumidity">
        <div className="air">
          <span className="material-symbols-sharp">air</span>
          <p>{`Vento: ${air} Km/h`}</p>
        </div>

        <div className="humidity">
          <span className="material-symbols-sharp">humidity_percentage</span>
          <p>{`Umidade: ${humidity}%`}</p>
        </div>
      </section>
    </main>
  </>
}

export default Main;