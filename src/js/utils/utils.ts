import { getImage, infoPlace, TEXT_MESSAGE_ITINERARY } from "../index";

export const defaultMessageItinerary = () => {
  const itinerary = document.querySelector("#itinerary");
  itinerary.innerHTML = `<p>${TEXT_MESSAGE_ITINERARY}</p>`;
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
  return text
    .replaceAll("á", "a")
    .replaceAll("é", "e")
    .replaceAll("í", "i")
    .replaceAll("ó", "o")
    .replaceAll("ú", "u");
};

export const createPopupTemplate = async (
  place,
  loader,
  costumerKey,
  nameCity
) => {
    
  const content = await infoPlace(
    place.replace(/_/g, " "),
    "getStoryPlaces",
    loader,
    costumerKey
  );

  const image = await getImage(`${place.replace(/_/g, " ")}, ${nameCity}`);
  const imageTag =
    image.image !== ""
      ? `<img src="${image.image}" alt="${image.alt}"></img>`
      : "";

  return {
    title: place.replace(/_/g, " "),
    content: `<p><br>${content}</p>
        ${imageTag}
        `,
  };
};
