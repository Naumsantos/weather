const CityDate = ({ name, region, time }) => {
  const dateHour = new Date();
  // formatando data e hora
  const hour = new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', timeZone: 'America/Sao_paulo' }).format(dateHour);
  const date = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateHour);

  return <>
    <section className="cityDate">
      <section className="city">
        <span className="material-symbols-rounded">pin_drop</span>
        <p>{name} - {region}</p>
      </section>
      <span className="date">{`Hoje, ${date} às ${hour}h`}</span>
    </section>
  </>
}

export default CityDate;
