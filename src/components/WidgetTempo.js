const WidgetClimaHora = ({ hour, img, deg }) => {
  return <div className="weatherTime">
    <p className='hour'> {hour}</p>
    <img className='img' src={img} alt="Icone tempo" />
    <p className='deg'>{`${deg}°C`}</p>
  </div>
};

export default WidgetClimaHora;