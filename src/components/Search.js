import { procuraCidade } from '../utils/consumoClimaTempo';
const Search = ({ city, setCity, setMensageiro, setWeatherForecast }) => {

  // recebe o valor do input
  const handleChange = (event) => {
    setCity(event.target.value);
    city = event.target.value;
  };

  // carrega a página de acordo com a cidade pesquisada
  const handleSearch = () => {
    setMensageiro("Carregando ...");
    procuraCidade(city).then((response) => {
      setMensageiro("");
      if (!response) {
        setMensageiro("Por favor, tente novamente com uma cidade válida");
      }
      setWeatherForecast(response);
    });

  };


  return <nav>
    <div>
      <h1>Clima</h1>
      <small>Veja como está o clima em sua cidade.</small>
      <div className="search">
        <input id='search' required onChange={handleChange} type="text" placeholder="busque uma cidade" value={city} />
        <button id="btn" onClick={handleSearch}><span className="material-symbols-rounded"> search </span></button>
      </div>
    </div>
  </nav>
}



export default Search;