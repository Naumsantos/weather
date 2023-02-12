const CityDate = ({ name, region, date, time }) => {
  return <>
    <section className="cityDate">
      <section className="city">
        <span className="material-symbols-rounded">pin_drop</span>
        <p>{name} - {region}</p>
      </section>
      <span className="date">{`Hoje, ${date} às ${time}`}</span>
    </section>
  </>
}

export default CityDate;
