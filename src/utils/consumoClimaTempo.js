const baseURL = "http://api.weatherapi.com/v1/forecast.json";
const key = process.env.API_KEY;
const lang = "pt";

const coletaResultadoJSON = async (URL) => {
  let res = await fetch(URL);
  if (res.status === 200) {
    return res.json();
  }
  return null;
}

// carrega a página de acordo com a cidade pesquisada
export const procuraCidade = async (city) => {
  return await coletaResultadoJSON(`${baseURL}?key=${key}&q=${city}&lang=${lang}`);
}

// carrega a página com a localização atual do usuário
export const geolocalizacao = async (lat, long) => {
  return await coletaResultadoJSON(`${baseURL}?key=${key}&q=${lat},${long}&lang=${lang}`);
}