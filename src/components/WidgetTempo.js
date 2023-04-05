const WidgetClimaHora = ({ hour, img, deg }) => {
  return <div className="weatherTime">
    <p className='hour'> {hour}</p>
    <img className='img' src={img} alt="Icone tempo" />
    <p className='deg'>{`${deg}°C`}</p>
  </div>
};

export default WidgetClimaHora;

var detalhesDoTempo = [];
if (weatherForecast) {
  for (var proximaHora = 1; proximaHora <= 5; proximaHora++) {
    var proximoIndice = dateHour.getHours() + proximaHora;
    var horaAtual = weatherForecast.forecast.forecastday[0].hour[proximoIndice];

    console.log(horaAtual, "tamanho hora");
    console.log(proximoIndice, "indice");

    if (proximoIndice < 5) {
      // Não há mais horas restantes no dia atual, comece a contar a partir do próximo dia
      proximoIndice = proximoIndice - 24;
      horaAtual = weatherForecast.forecast.forecastday[1].hour[proximoIndice];
      console.log(horaAtual, "sdasd");
    }

    detalhesDoTempo.push(
      <WidgetClimaHora
        key={proximoIndice}
        hour={horaAtual.time.split(" ")[1]}
        img={horaAtual.condition.icon}
        deg={parseInt(horaAtual.temp_c)}
      />
    );
  }

}