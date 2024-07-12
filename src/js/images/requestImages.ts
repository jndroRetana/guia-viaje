const urlRapidApi = "https://google-api31.p.rapidapi.com/imagesearch";
const urlGoogleApi = "https://www.googleapis.com/customsearch/v1";

const prefix = import.meta.env.DEV ? "PUBLIC" : "SECRET";

const createOptionsRapidApi = (text: string) => {
  return {
    method: "POST",
    headers: {
      "x-rapidapi-key": import.meta.env[`${prefix}_RAPIDAPI_KEY`] as string,
      "x-rapidapi-host": "google-api31.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      safesearch: "off",
      region: "wt-wt",
      color: "",
      size: "",
      type_image: "",
      layout: "",
      max_results: 1,
    }),
  };
};
const createUrlGoogleApi = (text: string) => {
  const url = new URL(urlGoogleApi);
  const params = {
    q: text,
    cx: import.meta.env.SECRET_GOOGLE_SEARCH_CX as string,
    key: import.meta.env.SECRET_GOOGLE_SEARCH_KEY as string,
    searchType: "image",
  };
  url.search = new URLSearchParams(params).toString();

  return url.toString();
};

const rapidApiTask = async (text: string) => {
  const options = createOptionsRapidApi(text);
  try {
    const response = await fetch(urlRapidApi, options);
    const result = await response.json();
    const dataImage =
      result.result?.length > 0
        ? { image: result.result[0].image, alt: result.result[0].title }
        : { image: "", alt: "" };

    return dataImage;
  } catch (error) {
    console.error(error);

    return { image: "", alt: "" };
  }
};

const googleApiTask = async (text: string) => {
  const url = createUrlGoogleApi(text);
  try {
    const response = await fetch(url);
    const result = await response.json();
    const dataImage =
      result.items?.length > 0
        ? { image: result.items[0].link, alt: text }
        : { image: "", alt: "" };

    return dataImage;
  } catch (error) {
    console.error(error);

    return { image: "", alt: "" };
  }
};

export const getImage = async (text: string) => {

  return await googleApiTask(text);
};
