export const defaultMessageItinerary = () => {
  const itinerary = document.querySelector("#itinerary");
  itinerary.innerHTML =
    "<p>Aquí encontraras información sobre el itinerario seleccionado para los diferentes sitios a visitar en la ciudad seleccionada.</p>";
  return itinerary;
};

export const getInfoAboutCity = async (
  textStream,
  targetCity,
  loader,
  costumerKey
) => {
  const coord = await textStream(
    targetCity,
    "getLocationCities",
    loader,
    costumerKey
  );
  const [longitud, latitud] = await JSON.parse(coord);
  const type = await textStream(
    targetCity,
    "getIsCountryOrCity",
    loader,
    costumerKey
  );
  const locationMap = [parseFloat(longitud), parseFloat(latitud)];

  return { locationMap, type };
};

export const getInfoAboutPlaces = async (
  textStream,
  targetCity,
  loader,
  costumerKey
) => {
  const places = await textStream(
    targetCity,
    "getSuggestionsPlaces",
    loader,
    costumerKey
  );
  const placesNames = Object.keys(JSON.parse(places));
  const textPlacesNames = placesNames.join(", ").replace(/_/g, " ");

  return { places, textPlacesNames };
};

export const replaceCaracteres = (text) => {
    //remplazar caracteres con acentos
    return text.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
}
